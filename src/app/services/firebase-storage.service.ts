import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';

interface UploadResult {
  fileRef: AngularFireStorageReference;
  uploadTask: AngularFireUploadTask;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  constructor(private storage: AngularFireStorage) {}
  uploadFile(imageBase64): UploadResult {
    const now = Date.now();
    const filePath = `PostImages/postImage-${now}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = fileRef.putString(imageBase64.split(',')[1], 'base64', {
      contentType: 'image/jpg',
    });
    return { fileRef: fileRef, uploadTask: uploadTask };
  }
}
