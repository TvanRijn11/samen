// app.component.ts
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  date: any;
  now: any;
  startDate: any = new Date(2024, 10, 2);
  targetDate: any = new Date(2024, 11, 2);
  targetTime: any = this.targetDate.getTime();
  difference!: number;
  months: Array<string> = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentTime: any = `${
    this.months[this.targetDate.getMonth()]
  } ${this.targetDate.getDate()}, ${this.targetDate.getFullYear()}`;

  monthsValue!: number;
  weeksValue!: number;
  daysValue!: number;
  hoursValue!: number;
  minutesValue!: number;
  secondsValue!: number;

  currentUnit: string = 'months';
  unitSequence: Array<string> = ['months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];
  unitIndex: number = 0;

  ngAfterViewInit() {
    this.createHearts();
    setTimeout(() => {
      this.tickTock();
      setInterval(() => {
        this.tickTock();
      }, 1000);

      setInterval(() => {
        this.switchUnit();
      }, 7000);
    }, 0);
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();
    this.difference = this.targetTime - this.now;

    const nowDate = new Date();
    const targetDate = new Date(this.targetDate);

    // Calculate difference in months
    let yearsDifference = targetDate.getFullYear() - nowDate.getFullYear();
    let monthsDifference = targetDate.getMonth() - nowDate.getMonth();
    this.monthsValue = parseFloat((yearsDifference * 12 + monthsDifference + (targetDate.getDate() - nowDate.getDate()) / 30.44).toFixed(1));

    // Calculate difference in weeks
    this.weeksValue = parseFloat((this.difference / (1000 * 60 * 60 * 24 * 7)).toFixed(1));

    this.daysValue = Math.floor(this.difference / (1000 * 60 * 60 * 24));
    this.hoursValue = Math.floor(this.difference / (1000 * 60 * 60));
    this.minutesValue = Math.floor(this.difference / (1000 * 60));
    this.secondsValue = Math.floor(this.difference / 1000);

    // Update progress bar
    this.updateProgressBar();
  }

  updateProgressBar() {
    const totalDuration = this.targetDate.getTime() - this.startDate.getTime();
    const elapsedDuration = this.now - this.startDate.getTime();
    const progressPercentage = (elapsedDuration / totalDuration) * 100;
    const progressBar = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');

    if (progressBar) {
      progressBar.style.width = `${progressPercentage}%`;
    }

    if (progressText) {
      progressText.textContent = `${progressPercentage.toFixed(1)}%`;
    }
  }

  switchUnit(direction: string = 'next') {
    if (direction === 'next') {
      this.unitIndex = (this.unitIndex + 1) % this.unitSequence.length;
    } else {
      this.unitIndex = (this.unitIndex - 1 + this.unitSequence.length) % this.unitSequence.length;
    }
    this.currentUnit = this.unitSequence[this.unitIndex];
  }

  onSwipeLeft() {
    this.switchUnit('next');
  }

  onSwipeRight() {
    this.switchUnit('prev');
  }

  createHearts() {
    const container = document.querySelector('.heart-container');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) { // Create 50 hearts
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.top = `${Math.random() * 100}vh`; // Random vertical starting position
      heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random duration between 5s and 10s
      heart.style.animationDelay = `${Math.random() * 8}s`; // Random delay up to 10s
      
      container.appendChild(heart);
    }
  }
}
