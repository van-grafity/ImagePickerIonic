import { Component, ViewChild } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { User } from '../mock/user'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imageResponse: any;
  images: any;
  options: any;
  testerCode: string;
  imageURL: any;

  @ViewChild('fileButton', { static: true }) fileButton;


  constructor(private imagePicker: ImagePicker, private toastCtrl: ToastController) {
    this.images = [];

    var printed = new User;
    printed.great();
  }

  getImages() {
    this.options = {
      height: 500,
      quality: 100,
      outputType: 1,
      maximumImagesCount: 10,
      width: 800
    };
    this.imageResponse = [];

    this.imagePicker.getPictures(this.options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
      }
      for (var x = 0; x < this.imageResponse.length; x++) {
        this.images.push(this.imageResponse[x])
      }
    }, (err) => {
      alert(err);
    });
  }

  hasReadPermission() {
    this.imagePicker.hasReadPermission().then((results) => {
      alert(results);
    })
  }

  requestReadPermission() {
    // no callbacks required as this opens a popup which returns async
    this.imagePicker.requestReadPermission();
  }

  uploadFile() {
    this.fileButton.nativeElement.click();
  }

  fileChanged(event) {
    const files = event.target.files;
    console.log(files);
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result;
      this.images.push(this.imageURL)
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  async presentToast(index) {
    const toast = await this.toastCtrl.create({
      message: 'Your settings have been saved.' + index,
      duration: 1000
    });
    toast.present();
  }
}
