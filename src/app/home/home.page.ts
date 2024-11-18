import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  ToastController,
  IonItem,
  IonAlert,
  IonSpinner,
  IonFooter,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonAlert,
    IonSpinner,
    IonFooter,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
})
export class HomePage {
  city: string = '';
  weather: any;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private toastController: ToastController) { }

  // FUNCTION TO DISPLAY A TOAST MESSAGE
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }

  // CLEAR WEATHER DATA WHEN THE CITY NAME CHANGES
  clearWeatherData() {
    this.weather = null;
    this.errorMessage = '';
  }

  // FUNCTION TO GET WEATHER INFORMATION
  getWeather() {
    if (!this.city.trim()) {
      this.showToast('City name is required');
      this.errorMessage = 'City name is required';
      return;
    }

    this.isLoading = true;

    const apiKey = '5f542dc7a2794e4e10ff40c4b0f14b1c'; // OpenWeatherMap API key https://openweathermap.org/
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;

    this.http.get(url).subscribe(
      (data) => {
        this.weather = data;
        this.isLoading = false;
        this.showToast('Weather data fetched successfully');
      },
      (error) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.errorMessage = 'City not found. Please check the city name.';
          this.showToast(this.errorMessage);
        } else {
          this.errorMessage = 'Error fetching weather data. Please try again later.';
          this.showToast(this.errorMessage);
        }
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
