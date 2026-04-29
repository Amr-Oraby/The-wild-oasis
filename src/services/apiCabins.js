import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');
    if (error) throw new Error("Cabins cound not be loaded");
    return data;
}

export async function deleteCabin(id) {
    const { error, data } = await supabase
        .from('cabins')
        .delete()
        .eq("id", id);
    if (error) throw new Error("Cabin cound not be deleted");
    return data;
}

export async function createEditCabin(cabin, id) {
    const imageName = `${Math.random()}-${cabin?.image.name}`.replaceAll("/", "");
    let imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // what is really stored
    if (cabin.image.toString().includes(supabaseUrl)) imagePath = cabin?.image; // duplicate state

    // 1. Create/Edit cabin
    // A) Create
    let query = supabase.from("cabins");
    if (!id)
        query = query.insert([{ ...cabin, image: imagePath }]); // array of one object that contains column and value  
    // B) Edit
    if (id)
        query = query.update({ ...cabin, image: imagePath })
            .eq('id', id);
    const { data, error } = await query.select();
    if (error) throw new Error("cabin could not be created");

    if (cabin.image.toString().includes(supabaseUrl)) return data; // duplicate state

    // 2. Upload image
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, cabin.image); // name of file ,file itself;

    // 3. delete the cabin if there was an error uploading the image
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq("id", data.id); // data is the uploaded image but cabin is the previous object used 
        throw new Error("cabin image could not be uploaded");
    }
    return data;
}