// START-DOCUMENT
$(document).ready(function() {
  $(".loader").hide(); // HIDE-LOADER-INITIALLY

  var myFbToken = "EAACEdEose0cBABSvtsdpSVXp9r8h3M3QZA7X3WaZCyd9fq8R1vSWNgMXO6o9tP2J3TbVZBsslZAkOVjs2hNKDhqorRCTK4mhivjp4uU5kupdV2giCa3P3l5WBHLApiWk7IJEfZBASzXLwGvdRXZBjlM22ET1AiyG8yYtKcKqKZBSXySYlHATGUT82FB61wdfkF9QFdcAHnN5AZDZD";

  // PROFILE-INFO-FUNCTION
  function getFbProfileInfo(){
    $.ajax({
        url: "https://graph.facebook.com/me?fields=email%2Chometown%2Cbirthday%2Ceducation%2Cwork&access_token=" + myFbToken,
        method: "GET",

        success: function(response){
          console.log(response);

          $(".profile-info").show(500);

          if(response.id !== null && response.id !== undefined){
            $("#myId").text(response.id);
          }
          if(response.email !== null && response.email !== undefined){
            $("#myEmail").text(response.email);
          }
          if(response.hometown !== null && response.hometown !== undefined){
            $("#myHometown").text(response.hometown.name);
          }
          if(response.birthday !== null && response.birthday !== undefined){
            $("#myBirthday").text(response.birthday);
          }
          if(response.education !== null && response.education !== undefined){
            var schoolName = response.education;

            schoolName = $.map(schoolName, function(id, school){
                return id.school.name;
            });

            $("#schoolName").text(schoolName);
          }

          if(response.education !== null && response.education !== undefined){
            var schoolYear = response.education;

            schoolYear = $.map(schoolYear, function(index, year){
              return index.year;
            });

            schoolYear = $.map(schoolYear, function(index, name){
              return index.name;
            });

            $("#schoolYear").text(schoolYear);
          }

          var workDescription = response.work;
          workDescription = $.map(workDescription, function(index, description){
            return index.description;
          });

          $("#workDescription").text(workDescription);

          var workPosition = response.work;

          workPosition = $.map(workPosition, function(index, position){
            return index.position.name;
          });

          $("#workPosition").text(workPosition);
        },

        error: function ( request,errType,errMessage) {
					alert ( errMessage + "\n Check Console in developer tools and fix the error") ;
					console.log (errType);
					console.log(request) ;
        },

        timeout: 4000,

        complete : function (){
          $(".loader").hide();
        },

        beforeSend : function(){
          $(".profile-info").hide();
          $(".loader").show();
        }
      }
    );
    //END-OF-AJAX-CALL
  }
  // END-OF-PROFILE-INFO-FUNCTION
  // FEEDS-FUNCTION
  function getFbFeed(){
    $.ajax({
        url: "https://graph.facebook.com/me?fields=posts&access_token=" + myFbToken,
        method: "GET",
        success: function(response){

          $(".feedsInfo").show(500);

          var postsData = response.posts.data;
          console.log(response.posts.data);

          // LOOP-TO-ITERATE-DATA
          for(var i = 0; i < 10; i++){
            var postId = "id"+i;
            var storyId = "story"+i;
            var postTime = "time"+i;
            var messageId = "message"+i;

            // CREATE-CARDS-FOR-POSTS-DATA
            var posts = '<div class="card text-white bg-dark mb-3"><div class="card-header"> <p class="font-weight-bold"> Post Id : <span id='+postId+'> </span></p> </div> <div class="card-body"> <h4 class="card-title">Posted On : <time class="text-primary font-weight-bold" datetime='+postTime+' id='+postTime+'></time> </h4> <p id='+storyId+'></p> <p class="card-text" id='+messageId+'> </p> </div> </div>';

            // APPENDING-CREATED-CARDS-INTO-FEEDS-INFO-WRAPPER
            $("#feeds-info-wrapper").append(posts);

            // EMBEDING-DATA-INTO-CARDS
            $("#"+postId).text(postsData[i].id);
            $("#"+storyId).text(postsData[i].story);
            $("#"+storyId).css({'font-weight' : 'bold'});

            $("#"+postTime).text(postsData[i].created_time);
            $("#"+messageId).text(postsData[i].message);
            $("#"+messageId).css({'color' : '#eee', 'font-size' : '1.15em', 'text-shadow' : '1px 2px 3px rgba(0,0,0,0.5)'});
          }
          // END-OF-LOOP-TO-ITERATE-DATA
        },

        error: function ( request,errType,errMessage) {
					alert ( errMessage + "\n Check Console in developer tools and fix the error") ;
					console.log (errType);
					console.log(request) ;
        },

        timeout: 4000,

        complete : function (){
          $(".loader").hide();
        },
        beforeSend : function(){
          $(".feedsInfo").hide();
          $(".loader").show();
        }
      }
    );
    //END-OF-AJAX-CALL
  }
  // END-OF-FEEDS-FUNCTION
  // EVENT-LISTENER
  $("#getFbProfileInfo").on('click', getFbProfileInfo);
  $("#getFbFeed").on('click', getFbFeed);

});
// END-DOCUMENT
