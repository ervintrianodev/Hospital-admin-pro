import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor() {}

  async updatePhoto(
    file: File,
    tipo: 'usuarios' | 'medicos' | 'hospiales',
    id: string
  ) {
    try {
      const url = `${baseUrl}/api/uploads/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', file);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-api-key': localStorage.getItem('token') || '',
        },
        body: formData,
      });
      const data = await resp.json();
      return data;

      return true;
    } catch (error) {
      console.log(`Ha ocurrido un error al cargar la imagen ${error}`);
      return false;
    }
  }
}
