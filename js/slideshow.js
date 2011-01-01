if (typeof console == "undefined" || typeof console.log == "undefined") var console = { log: function() {} };

(function($) {
  $.fn.addStep = function(fn) {
    var steps = $.data(this[0], "steps") || [];
    steps.push(fn);
    jQuery.data(this[0], 'steps', steps);
    return this;
  };

  var map;
  var overlays = [];

  $('#whoami-slide').bind('slides.preload', function() {
    $(this).find('p:last').html("I'm from Warsaw<span class=\"poland\" style=\"display: none\">, Poland.</span>");
    $.each(overlays, function() { this.setMap(null); });

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.25, 21),
        map: map
    });
    map.setCenter(new google.maps.LatLng(52.25, 21));
    map.setZoom(8);
    overlays.push(marker);

  }).addStep(function() {
    map.setZoom(4);
    $('.poland').show(400);
  }).addStep(function() {
    this.find('p:last').html("Although it's not close to Chicago...");

    var coordinates = [
        new google.maps.LatLng(52.25, 21),
        new google.maps.LatLng(41.51, -87.39)
    ];

    map.setZoom(2);
    map.setCenter(new google.maps.LatLng(45, -30));

    var poly = new google.maps.Polyline({
      path: coordinates,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    poly.setMap(map);

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(41.51, -87.39),
        map: map
    });

    overlays.push(marker);
    overlays.push(poly);
  }).addStep(function() {
    this.find('p:last').html("...I know that you don't pay much attention for working in the office :)");
  });

  var Slideshow = function() {
    this.current = $('.slide:first');
    this.slides = $('#slides');
    this.currentStep = -1;
    this.bindEvents();
  }

  Slideshow.prototype = {
    next: function() {
      var steps = $.data(this.current[0], 'steps');
      if(steps && steps[this.currentStep + 1]) {
        this.currentStep += 1;
        steps[this.currentStep].apply(this.current);
      } else {
        var next = this.current.next();
        if(next[0]) {
          $.history.load(next.attr("data-id"), true);
        }
      }
    },

    goToSlide: function(id, animate) {
      if(this.current.attr("data-id") == id) {
        return false;
      }
      if(!id || id == "") {
        id = "start";
      }

      this.current = this.slides.find("[data-id="+id+"]");
      if(this.current.length == 0) {
        this.current = this.slides.find(".slide:first");
      }
      this.update(animate);
    },

    prev: function() {
      var prev = this.current.prev();
      if(prev[0]) {
        $.history.load(prev.attr("data-id"), true);
      }
    },

    update: function(animate) {
      this.currentStep = -1;
      var current = this.current;
      current.trigger('slides.preload');
      var time = 0;
      if(animate) time = 400;
      this.slides.scrollTo( current, time, { onAfter: function() { current.trigger('slides.load'); } } );
      this.activateLink();
    },

    activateLink: function() {
      var id = this.current.attr("data-id");
      $("#shortcuts a.active").removeClass("active");
      $("#shortcuts a[href$=#" + id +"]").addClass("active");
    },

    keydown: function(e) {
      switch (e.keyCode) {
        case 37: // left arrow
          this.prev(); break;
        case 39: // right arrow
        case 32: // space
          this.next(); break;
      }
    },

    bindEvents: function() {
      var self = this;
      $(document).keydown(function(e) {
        self.keydown(e);
      });
      $('body').bind('swipeleft', function(event) {
        self.next();
      }).bind('swiperight', function(event) {
        self.prev();
      });
    }
  }

  $(function() {
    var slideshow = new Slideshow();

    var center = new google.maps.LatLng(52.25, 21);
    var options = {
      zoom: 8,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    map = new google.maps.Map($("#map")[0], options);

    $.lightBoxFu.initialize();
    $("#about").click(function() {
      $.lightBoxFu.open({
        html: $("#about-content").html(),
        width: "600px",
      });
      return false;
    });

    $.history.init(function(hash, animate){
      slideshow.goToSlide(hash, animate);
    });

    $('body').focus();
  });
})(jQuery);
