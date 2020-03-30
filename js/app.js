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
    $('main section').append($galleryClone);
  };
  const page1Json = () => {
    $.ajax('../data/page-1.json', { method: 'GET' ,dataType:'JSON'}).then(page1 => {
      page1.forEach(galleryItem => {
        let gallery = new Gallery(galleryItem);
        gallery.render();
      });
    });
  };
  page1Json();
});


