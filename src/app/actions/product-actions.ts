"use server"

import { supabaseAdmin } from '@/lib/supabase/admin'
import { ProductCategory } from '@/types/database'

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