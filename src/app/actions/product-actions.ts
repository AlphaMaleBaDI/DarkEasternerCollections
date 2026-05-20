"use server"

import { supabaseAdmin } from '@/lib/supabase/admin'
import { ProductCategory } from '@/types/database'
import { revalidatePath } from 'next/cache'

export async function uploadProduct(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const baseSlug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    let exists = true;

    while (exists) {
      const { data } = await supabaseAdmin
        .from('products')
        .select('id')
        .eq('slug', slug)
        .single();
      
      if (!data) {
        exists = false;
      } else {
        slug = `${baseSlug}-${counter++}`;
      }
    }

    const description = formData.get('description') as string;
    const category = formData.get('category') as ProductCategory;
    const price = formData.get('price') ? Number(formData.get('price')) : null;
    const showPrice = formData.get('showPrice') != null;
    const stock = formData.get('stock') ? Number(formData.get('stock')) : 0;
    const featured = formData.get('featured') != null;
    const status = formData.get('status') || 'draft';

    const rawSku = formData.get('sku') as string | null;
    const sku = rawSku?.trim().toUpperCase() || null;

    // 1. Handle Image Upload
    const imageFile = formData.get('image') as File;
    let imagePath = '';

    if (imageFile && imageFile.size > 0) {
      // Validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        throw new Error('Unsupported image format. Please use JPG, PNG or WebP.');
      }

      if (imageFile.size > 10 * 1024 * 1024) { // 10MB Limit
        throw new Error('Image size exceeds the 10MB luxury limit.');
      }

      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      imagePath = publicUrlData.publicUrl;
    }

    // 2. Insert Product
    const { error: insertError } = await supabaseAdmin
      .from('products')
      .insert({
        title,
        sku,
        slug,
        description,
        category,
        price,
        show_price: showPrice,
        stock_quantity: stock,
        in_stock: stock > 0,
        featured,
        status,
        main_image_url: imagePath,
      });

    if (insertError) {
      if (insertError.code === '23505' || (insertError.message && insertError.message.includes('sku'))) {
        throw new Error('This SKU is already registered in the House archives. Please use a unique SKU.');
      }
      throw insertError;
    }

    return { success: true, message: 'Product added to the House archives.' };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred during upload.';
    console.error('Upload error:', message);
    return { success: false, message };
  }
}

export async function toggleProductArchive(id: string, currentStatus: string) {
  try {
    const newStatus = currentStatus === 'archived' ? 'published' : 'archived';
    const { error } = await supabaseAdmin
      .from('products')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) throw error;

    return { 
      success: true, 
      message: `Product successfully ${newStatus === 'archived' ? 'archived' : 'restored to published'}.`,
      newStatus
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    console.error('Archive toggle error:', message);
    return { success: false, message };
  }
}

export async function deleteProduct(id: string) {
  try {
    // 1. Query the product to retrieve main_image_url
    const { data: product, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('main_image_url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Safe Storage Cleanup Guard
    const imageUrl = product?.main_image_url;
    if (imageUrl && imageUrl.includes('/storage/v1/object/public/product-images/')) {
      // Extract the filename from the URL path
      const parts = imageUrl.split('/');
      const fileName = parts[parts.length - 1];
      
      if (fileName) {
        console.log(`Curator storage cleanup: removing ${fileName} from product-images bucket...`);
        const { error: storageError } = await supabaseAdmin.storage
          .from('product-images')
          .remove([fileName]);

        if (storageError) {
          console.warn('Storage cleanup non-blocking warning:', storageError.message);
        }
      }
    }

    // 3. Purge Database Row
    const { error: deleteError } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (deleteError) throw deleteError;

    // 4. Revalidate cache on all storefront and admin channels
    revalidatePath('/admin/products');
    revalidatePath('/collections');
    revalidatePath('/');

    return { success: true, message: 'Asset permanently expunged from the House archives.' };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred during database purging.';
    console.error('Destructive delete error:', message);
    return { success: false, message };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    // 1. Fetch current product data to get current image and slug
    const { data: currentProduct, error: fetchError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !currentProduct) {
      throw new Error('Product not found in House archives.');
    }

    const title = formData.get('title') as string;
    let slug = currentProduct.slug;

    // Regenerate slug if title changed
    if (title && title !== currentProduct.title) {
      const baseSlug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      slug = baseSlug;
      let counter = 1;
      let exists = true;

      while (exists) {
        const { data } = await supabaseAdmin
          .from('products')
          .select('id')
          .eq('slug', slug)
          .neq('id', id)
          .single();
        
        if (!data) {
          exists = false;
        } else {
          slug = `${baseSlug}-${counter++}`;
        }
      }
    }

    const description = formData.get('description') as string;
    const category = formData.get('category') as ProductCategory;
    const price = formData.get('price') ? Number(formData.get('price')) : null;
    const showPrice = formData.get('showPrice') != null;
    const stock = formData.get('stock') ? Number(formData.get('stock')) : 0;
    const featured = formData.get('featured') != null;
    const status = formData.get('status') || 'draft';

    const rawSku = formData.get('sku') as string | null;
    const sku = rawSku?.trim().toUpperCase() || null;

    // 2. Handle Image Asset Update
    const imageFile = formData.get('image') as File | null;
    let imagePath = currentProduct.main_image_url;

    if (imageFile && imageFile.size > 0) {
      // Validate image format
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(imageFile.type)) {
        throw new Error('Unsupported image format. Please use JPG, PNG or WebP.');
      }

      if (imageFile.size > 10 * 1024 * 1024) { // 10MB Limit
        throw new Error('Image size exceeds the 10MB luxury limit.');
      }

      // Upload new image
      const fileName = `${Date.now()}-${imageFile.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;
      
      const { data: publicUrlData } = supabaseAdmin.storage
        .from('product-images')
        .getPublicUrl(fileName);
      
      imagePath = publicUrlData.publicUrl;

      // Delete old image if it was hosted in Supabase storage
      const oldUrl = currentProduct.main_image_url;
      if (oldUrl && oldUrl.includes('/storage/v1/object/public/product-images/')) {
        const parts = oldUrl.split('/');
        const oldFileName = parts[parts.length - 1];
        if (oldFileName) {
          console.log(`Curator storage cleanup: purging old file ${oldFileName} from bucket...`);
          await supabaseAdmin.storage
            .from('product-images')
            .remove([oldFileName]);
        }
      }
    }

    // 3. Update database row
    const { error: updateError } = await supabaseAdmin
      .from('products')
      .update({
        title,
        sku,
        slug,
        description,
        category,
        price,
        show_price: showPrice,
        stock_quantity: stock,
        in_stock: stock > 0,
        featured,
        status,
        main_image_url: imagePath,
      })
      .eq('id', id);

    if (updateError) {
      if (updateError.code === '23505' || (updateError.message && updateError.message.includes('sku'))) {
        throw new Error('This SKU is already registered in the House archives. Please use a unique SKU.');
      }
      throw updateError;
    }

    // 4. Revalidate paths
    revalidatePath('/admin/products');
    revalidatePath(`/product/${slug}`);
    if (slug !== currentProduct.slug) {
      revalidatePath(`/product/${currentProduct.slug}`);
    }
    revalidatePath('/collections');
    revalidatePath('/');

    return { success: true, message: 'Product updated successfully in the House archives.' };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred during update.';
    console.error('Update error:', message);
    return { success: false, message };
  }
}