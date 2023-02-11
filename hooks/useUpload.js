import { defaultClient } from '../services/client';
import * as ImagePicker from 'expo-image-picker';

const defaultOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  // allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
  allowsMultipleSelection: false,
  selectionLimit: 1,
  orderedSelection: true,
  base64: true,
};

function useUpload() {
  async function handleOpenImageLib(options = {}) {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        return alert(
          'Sorry, we need camera roll permissions to make this work!',
        );
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      ...defaultOptions,
      ...options,
    });

    return result;
  }

  async function handleUploadFile(acceptedFiles) {
    if (!acceptedFiles) return;

    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles);
      formData.append('upload_preset', 'social_mern');

      const promise = new Promise((resolve) => {
        defaultClient
          .post(
            'https://api.cloudinary.com/v1_1/luongdao/image/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          )
          .then((res) => {
            resolve(res.data.secure_url);
          })
          .catch((error) => {
            console.log({ ...error });
          });
      });

      const url = await promise;
      return url;
    } catch (error) {
      console.log(error);
    }
  }

  return { handleUploadFile, handleOpenImageLib };
}

export default useUpload;
