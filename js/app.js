let arrayToPush=[];
$(document).ready(function(){
  function Gallery(image_url,title,description,keyword,horns){
    this.image_url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
  }
  Gallery.prototype.render = function() {
    let $galleryClone = $('#photo-template').clone();
    $galleryClone.removeAttr('photo-template');
    $galleryClone.find('img').attr('src',this.image_url);
    $galleryClone.find('h2').text(this.title);
    $galleryClone.find('p').text(this.description);
    $galleryClone.attr('class',this.keyword);
    $('main').append($galleryClone);
  };
  Gallery.prototype.filter = function(){
    let imageFilter = $('.select-class');
    if(!(arrayToPush.includes(this.keyword))){
      arrayToPush.push(this.keyword);
      imageFilter.append(`<option>${this.keyword}</option>`);}
  };
  const pageJson = () => {
    $.ajax('../data/page-1.json', { method: 'GET' ,dataType: 'JSON'}).then(page1 => {
      page1.forEach(function(value){
        let gallery = new Gallery(value.image_url,value.title,value.description,value.keyword,value.horns);
        gallery.filter();
        gallery.render();
      });
    });
  };
  pageJson();
});


$('.select-class').change(function(){
  var selected = $(this).children('option:selected').val();
  arrayToPush.forEach(function(val){
    if(selected === val) {
      $('section').hide();
      $(`.${val}`).show();
    }
  });
});
