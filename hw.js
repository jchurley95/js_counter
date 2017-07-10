// General Assembly, WDI (Web Development Immersive) Remote, Cohort 02 (R2D2)
// Copyright (C) 2016 Matt Brendzel under the GNU General Public License.
// See LICENSE for details.

"use strict";

// Data Management and Business Logic //
const CounterCollection = {
  lastCountId: 0,
  counters: [], // e.g. {countId: 3, count: 20}
  createCounter: function(){
    this.lastCountId++;
    this.counters.push({
      countId: this.lastCountId,
      count: 0
    });
    return this.lastCountId;
  },
  getCounterValue: function(countId){
    console.log(`read counter #${countId}`);
    let counter = this.counters.find(function(counter){
      return counter.countId === countId;
    });
    if (counter) { return counter.count; }
  },
  incrementCounter: function(countId){
    console.log(`increment counter #${countId}`);
    let counter = this.counters.find(function(counter){
      return counter.countId === countId;
    });
    if (counter) {
      counter.count += 1;
      return counter.count;
    }
  },
  destroyCounter: function(countId){
    console.log(`destroy counter #${countId}`);
    let counter = this.counters.find(function(counter){
      return counter.countId === countId;
    });
    if (counter) { counter.destroy(); }
    this.counters = this.counters.filter(function(counter){ //
      return counter.countId !== countId
    });
  }
};

// UI //
const Presenter = {
  insertCounterComponent: function(newCountId){
    console.log(`insert counter component #${newCountId}`);
    let insert = document.createElement('div');
    // insert increment button using .innerHTML =
    insert.innerHTML =
    `<h3>Count: <span>0</span></h3> <button class='increment'> +1 </button> <button class='delete'> Delete </button>`;
    
    insert.className += ' counter'; // Adds ' counter' to the existing class name
    insert.dataset.countId = newCountId; // inserts countID from createCounter function as data attribute
    insert.getElementsByClassName('increment')[0].onclick= AppController.onClickIncrement; // Once increment button is pushed count is incremented
    insert.getElementsByClassName('delete')[0].onclick = AppController.onClickDelete; // Once delete button is clicked the counter is deleted
    
    document.getElementById('counter-list').appendChild(insert); // Adds this counter with these properties to the counter list
  },

  refreshCounterComponent: function(countId){
    console.log(`refresh counter component #${countId}`);
    
    let refresh = CounterCollection.getCounterValue(countId); // calls getCounterValue function using countID as parameter, returns count
    document.querySelector(`[data-count-id="${countId}"] span`).innerHTML = refresh;
  },

  removeCounterComponent: function(countId){             // REACH
    console.log(`remove counter component #${countId}`);

    let remove = document.querySelector(`[data-count-id="${countId}"]`) //this selects the counter to be removed
    remove.parentNode.removeChild(remove); // this removes the counter
  }
};

// Top-Level Application Control //
const AppController = {
  onClickNewCounter: function(event){
    console.log(`click new counter (#${CounterCollection.lastCountId})`);
     CounterCollection.createCounter(); // calls createCounter functoin from CounterCollection, creates a counter
    Presenter.insertCounterComponent(CounterCollection.lastCountId); // calls insertCounterComponent from Presenter, adds a counter to the list
  },
  onClickIncrement: function(event){

    let countId = Number(event.target.parentNode.dataset.countId);
    console.log(`click increment #${countId}`);

    CounterCollection.incrementCounter(countId); // calls incrementCounter method from CounterCollection using countId as parameter, increments on click
    Presenter.refreshCounterComponent(countId); // calls refreshCounterComponent from Presenter, calls getCounterValue function using countID as parameter, returns count
  },
  onClickDelete: function(event){          
                     // REACH
    let countId = Number(event.target.parentNode.dataset.countId); // grabs I believe most recent addition countId from dataset using parentNode
    console.log(`click delete #${countId}`);
    CounterCollection.incrementCounter(countId);
    Presenter.removeCounterComponent(countId); // removes counter from page on click
  }
};

window.onload = function(){
  document.getElementById('new-counter').onclick = AppController.onClickNewCounter;
};
