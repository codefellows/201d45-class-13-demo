'use strict';

//  =============== Global Vars ===============
var totes_goats = 10;
var the_herd = [];
var currenty_displayed_right_goat;
var currenty_displayed_left_goat;

var goat_container = document.getElementById('all_goats');
var left_h2 = document.getElementById('left_goat_h2');
var right_h2 = document.getElementById('right_goat_h2');
var left_img = document.getElementById('left_goat_img');
var right_img = document.getElementById('right_goat_img');

// ================ Models =====================
var Goat = function(name, url){
  this.name = name;
  this.url = url;
  this.clicked_on_count = 0;

  the_herd.push(this);
};

// ============= Helpers ==============

var render_goat = function(goat, target_img, target_h2){ //complete
  target_img.src = goat.url;
  target_h2.textContent = goat.name;
};

var render_chart = function(){
  var canvas_el = document.getElementById('goat_results');
  var ctx = canvas_el.getContext('2d');

  var goat_click_data = [];
  var goat_click_labels = [];

  for (var i = 0; i < the_herd.length; i++) {
    goat_click_data.push(the_herd[i].clicked_on_count);
    goat_click_labels.push(the_herd[j].name);
  }

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: goat_click_labels, // Use your own labels
      datasets: [{
        label: '# of Voats per Goats', // Change the name
        data: goat_click_data, // use your own data
        backgroundColor: [
          'rgba(255, 99, 132, .9)',
          'rgba(54, 162, 235, .9)',
          'rgba(255, 206, 86, .9)',
          'rgba(75, 192, 192, .9)',
          'rgba(153, 102, 255, .9)',
          'rgba(255, 159, 64, .9)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
};

var pick_new_goats = function(){
  var left_goat_idx = Math.floor(Math.random() * the_herd.length); //represents index inside the herd
  var right_goat_idx = Math.floor(Math.random() * the_herd.length);

  currenty_displayed_left_goat = the_herd[left_goat_idx];
  currenty_displayed_right_goat = the_herd[right_goat_idx];

  render_goat(the_herd[right_goat_idx], right_img, right_h2);
  render_goat(the_herd[left_goat_idx], left_img, left_h2);
};

var increment_goat_clicks = function(goat_image_id){
  if (goat_image_id === 'left_goat_img') {
    currenty_displayed_left_goat.clicked_on_count++;
  } else if (goat_image_id === 'right_goat_img') {
    currenty_displayed_right_goat.clicked_on_count++;
  }
};

var handle_click_on_goat = function(event){ //done or close
  if(event.target.tagName === 'IMG'){
    increment_goat_clicks(event.target.id);

    if (totes_goats <= 0) {
      goat_container.removeEventListener('click', handle_click_on_goat);
      render_chart();
    } else {
      totes_goats--;
      pick_new_goats();
    }
  }
};


// =============== Initialization ==================

new Goat('cruising goat', './images/cruisin-goat.jpg');
new Goat('gloat your goat', './images/float-your-goat.jpg');
new Goat('goat away', './images/goat-away.jpg');
new Goat('goat out of hand', './images/goat-out-of-hand.jpg');
new Goat('kissing goat', './images/kissing-goat.jpg');
new Goat('sassy goat', './images/sassy-goat.jpg');
new Goat('smiling goat', './images/smiling-goat.jpg');

currenty_displayed_left_goat = the_herd[0];
currenty_displayed_right_goat = the_herd[1];

goat_container.addEventListener('click', handle_click_on_goat);
