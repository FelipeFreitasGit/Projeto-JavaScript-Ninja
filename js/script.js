(function($, doc) {
  'use strict';
  function app(){

    var image =  $('[data-js="image"]').get();
    var brand =  $('[data-js="brand"]').get();
    var year =  $('[data-js="year"]').get();
    var color =  $('[data-js="color"]').get();
    var plate =  $('[data-js="plate"]').get();

    return{
      init: function init(){
        this.companyInfo();
        this.initEvents();
        this.getRemoveTd();
      },

      initEvents: function initEvents(){
        $('[data-js="form-car"]').on('submit', this.handleRegister);
      },

      handleRegister: function handleRegister(event){
        event.preventDefault();
        var $tableCar = $('[data-js="table-car"]').get();
        $tableCar.appendChild(app().createNewCar());
        app().clearForm();
      },

      createNewCar: function createNewCar(){
        var $fragament = doc.createDocumentFragment();
        var $tr = doc.createElement('tr');
        var $tdImage = doc.createElement('td');
        var $tdBrand = doc.createElement('td');
        var $tdYear = doc.createElement('td');
        var $tdPlate = doc.createElement('td');
        var $tdColor = doc.createElement('td');
        var $img = doc.createElement('img');

        $img.src = image.value;
        $tdImage.appendChild($img);

        $tdBrand.textContent = brand.value;
        $tdYear.textContent = year.value;
        $tdPlate.textContent = plate.value;
        $tdColor.textContent = color.value;

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);

        return $fragament.appendChild($tr);
      },

      clearForm: function clearForm(){
        image.value = '',
        brand.value = '',
        year.value = '',
        plate.value = '',
        color.value = ''
      },

      companyInfo: function companyInfo(){
        var ajax = new XMLHttpRequest();
        ajax.open('GET', 'data/company.json', true);
        ajax.send();
        ajax.addEventListener('readystatechange', this.getCompanyInfo, false);
      },

      getCompanyInfo: function getCompanyInfo(){
        if(!app().isRequestOK.call(this))
          return;

        var data = JSON.parse(this.responseText);
        var $companyName =  $('[data-js="company-name"]').get();
        var $companyPhone =  $('[data-js="company-phone"]').get();
        $companyName.textContent = data.name;
        $companyPhone.textContent = data.phone;
      },

      isRequestOK: function isRequestOK(){
        return this.readyState === 4 && this.status === 200;
      },

      getRemoveTd: function getRemoveTd(){
        $('[data-js="remove"]').on('click', this.removeTd);
      },

      removeTd: function removeTd(event){
        event.preventDefault();
        var $tabCarro = $('[data-js="table-car"]');
        var $trCar = $tabCarro.lastElementChild;
        $trCar.innerHTML = '';
      }
    }

  }

  app().init();

})(window.DOM, document);
