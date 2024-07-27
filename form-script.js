jQuery(document).ready(function($){

    $('.macro_form').submit(function(e){
    	e.preventDefault();
      let age = $('#age').val();
      let gender = $('input[name="gender"]:checked').val();
      let weight = $('#weight').val();
      let weightType = $('input[name="weightType"]:checked').val();
      if ( weightType == 'pounds'){
        weight = weight * 0.45359237;
      }
      let feet = $('#feet').val();
      let inch = $('#inch').val();
      let cm = $('#cm').val();
      let heightType = $('input[name="heightType"]:checked').val();
      let height;
      if(heightType == 'heightFeet' ){ 
        height = feet * 30.48 + inch * 2.54;
      }else{
        height = cm
      }
      let activityLevel = $('input[name="activityLevel"]:checked').val();
      let goal = $('input[name="goal"]:checked').val();      
      
      let bmr;
      if(gender == 'male'){
      	bmr = 10 * weight + 6.25 * height - 5 * age +5
      }else if(gender == 'female'){
        bmr = 10 * weight + 6.25 * height - 5 * age - 161
      }
      console.log("bmr", bmr)

      let tdee;
      switch(activityLevel){
        case 'sedentary' : 
          tdee = bmr * 1;
          break;
        case 'light' :
          tdee = bmr * 1.1;
          break;
        case 'moderate' :
          tdee = bmr * 1.2;
          break;
        case 'very' :
          tdee = bmr * 1.3;
          break;
        case 'extra' :
          tdee = bmr * 1.4;
          break;
        default :
        tdee = bmr;
      }

      console.log("tdee", tdee)

      switch(goal){
        case 'weightLoss':
          tdee = tdee - 500
          break;
        case 'weightGain':
          tdee = tdee + 500
          break; 
        default:
          tdee = tdee    
      }

      let proteinGram, proteinCal, fatGram, fatCal, carbGram, carbCal;
      proteinGram = weight * 2.5
      proteinGram = Math.round(proteinGram)
      proteinCal = proteinGram * 4;
      proteinCal = Math.round(proteinCal)
      fatCal = tdee * 0.3;
      fatCal = Math.round(fatCal)
      fatGram = fatCal/9;
      fatGram = Math.round(fatGram)
      carbCal = tdee - (proteinCal + fatCal);
      carbCal = Math.round(carbCal)
      carbGram = carbCal/4;
      carbGram = Math.round(carbGram)

      /*
      console.log("proteinGram",proteinGram);
      console.log("proteinCal",proteinCal);
      console.log("fatCal",fatCal);
      console.log("fatGram",fatGram);
      console.log("carbCal",carbCal);
      console.log("carbGram",carbGram);
      */
     $('.carb-value').text(carbGram)
     $('.protein-value').text(proteinGram)
     $('.fat-value').text(fatGram)

      //console.log(age,gender,weight,weightType,feet,inch,cm, heightType, activityLevel,goal )
    })
    
  }) // End document ready