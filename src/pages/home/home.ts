import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animals } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animals: Animals[] = []
  audio = new Audio()
  audioTime: any
  isOrdering: boolean = false

  constructor(public navCtrl: NavController) {
    this.animals = ANIMALES.slice(0)
  }

  reproduceSound(animal:Animals) {
    this.pause_audio(animal)
    if(animal.reproduciendo) {
      return animal.reproduciendo = false
    } 

    this.audio.src = animal.audio
    this.audio.load()
    this.audio.play()
    animal.reproduciendo = true

    this.audioTime = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000)
  }

  private pause_audio(animalSelect:Animals) {
    clearTimeout(this.audioTime)
    this.audio.pause()
    this.audio.currentTime = 0
    for( let animal of this.animals ) {
      if(animal.nombre !== animalSelect.nombre) {
        animal.reproduciendo = false
      }
    }
  }

  stopSound(animal:Animals) {
    this.audio.pause()
    animal.reproduciendo = true
  }

  removeAnimal(index: number) {
    this.animals.splice(index, 1)
  }

  loadAnimals(refresher:Refresher) {
    setTimeout( () => {
      this.animals = ANIMALES.slice(0)
      refresher.complete()
    }, 1500)
  }

  reorderAnimals(index: any) {
    this.animals = reorderArray(this.animals, index)
  }

}
