(function($, doc) {
  'use strict';
  var app = (function(){

    var image =  $('[data-js="image"]').get();
    var brand =  $('[data-js="brand"]').get();
    var year =  $('[data-js="year"]').get();
    var color =  $('[data-js="color"]').get();
    var plate =  $('[data-js="plate"]').get();
    var ajax = new XMLHttpRequest();

    return{
      init: function init(){
        this.companyInfo();
        this.initEvents();
      },

      initEvents: function initEvents(){
        $('[data-js="form-car"]').on('submit', this.handleRegister);
      },

      handleRegister: function handleRegister(event){
        event.preventDefault();

        ajax.open('POST', 'http://localhost:3000/car');
        ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        ajax.send('image=' + image.value
                  + '&brandModel=' + brand.value
                  + '&year=' + year.value
                  + '&plate=' + plate.value
                  + '&color=' + color.value);

        console.log('Cadastrando usuário...');

        ajax.onreadystatechange = function(){
          if(ajax.readyState === 4 && ajax.status === 200)
            return console.log('Usuário cadastrado', ajax.responseText);
          return console.log(ajax.status);
        }

        app.clearForm();
        app.searchCar();
      },

      searchCar: function searchCar(){

        ajax.open('GET', 'http://localhost:3000/car');
        ajax.send();

        ajax.onreadystatechange = function(){
          if(ajax.readyState === 4 && ajax.status === 200){
            var carros = JSON.parse(ajax.responseText);
            console.log('carros', carros);
            carros.forEach(function(car){
              var $tableCar = $('[data-js="table-car"]').get();
              $tableCar.appendChild(app.createNewCar(car.image, car.brandModel, car.year, car.plate, car.color));
              app.getRemoveTd();
            });
          }
        }
      },

      createNewCar: function createNewCar(image, plate, year, color, brand){

        var $fragament = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $tdRemover = doc.createElement('td');
        var $btnRemover = doc.createElement('button');
        var $img = doc.createElement('img');

        $img.src = image;
        $tdImage.appendChild($img);

        var id = 'carNumber-' + app.generateID();

        $btnRemover.textContent = 'Remover';

        $tr.setAttribute('data-js', id);
        $btnRemover.setAttribute('id', id);
        $btnRemover.setAttribute('data-js', 'remove');
        $btnRemover.setAttribute('class', 'btn-remover');

        $tdRemover.appendChild($btnRemover);

        $tdBrand.textContent = brand;
        $tdYear.textContent = year;
        $tdPlate.textContent = plate;
        $tdColor.textContent = color;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($tdRemover);

        return $fragament.appendChild($tr);
      },

      clearForm: function clearForm(){
        image.value = '',
        brand.value = '',
        year.value = '',
        plate.value = '',
        color.value = ''
      },

      generateID: function generateID(){
        return Math.floor(Date.now() * (Math.random() * 10));;
      },

      getRemoveTd: function getRemoveTd(){
        $('[data-js="remove"]').on('click', this.removeTd);
      },

      removeTd: function removeTd(){
        var dataJS = '[data-js="id"]'.replace('id',this.id);
        var $car = $(dataJS).get();
        $car.remove();
      },

      companyInfo: function companyInfo(){
        ajax.open('GET', 'data/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo(){
        if(!app.isRequestOK.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName =  $('[data-js="company-name"]').get();
        var $companyPhone =  $('[data-js="company-phone"]'). get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isRequestOK: function isRequestOK(){
        return this.readyState === 4 && this.status === 200;
      },

    }

  })();

  app.init();

})(window.DOM, document);
