$(function(){

	/* Instantiate global vars */
	var topics = [
		'Steven Universe',
		'Gravity Falls',
		'The Regular Show',
		'Futurama',
		'Adventure Time',
		'Bravest Warriors',
		'Bee and Puppycat',
		'Avatar the Last Airbender',
		'Avatar the Legend of Korra',
		'Fullmetal Alchemist',
		'Archer',
		'Bob\'s Burgers',
		'BoJack Horseman'
	]

	/* Create buttons */
	$.each(topics, function(){
		appendBtn(this);
	});


	 function appendBtn(btn){
		$('#gif-select').append(
			'<button type="button" class="btn btn-default topic">' +
				btn +
			'</button>'
		);
	}

	/* Set click listener for topic */
	$('body').on('click', '.topic', function(){
		// Clear any existing gifs
		$('#gif-display').html('');

		// Fetch the topic
		var topic = $(this).html();

		/* Ping GIPHY API with topic keyword */
		$.ajax({
			url: 'http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q=' + topic,
		}).done(function(gifset) {
			// Cycle through response data
			$.each(gifset.data, function(){
				// Get the still and dynamic URLs
				var dynamic = this.images.original.url;
				var static = this.images.original_still.url;
				// Display gif w data attributes for image states
				$('#gif-display').append(
					'<img' +
					' class="gif"' +
					' data-static="' + static + '"' +
					' data-dynamic="' + dynamic + '"' +
					' data-animate="false"' +
					' src="' + static + '"' +
					' />'
				);
			});
		});
	});

	/* Set click listener for gif */
	$('body').on('click', '.gif', function(){
		// Find image state & replace the img src accordingly
		var isAnimated = $(this).data('animate');
		var staticUrl = $(this).data('static');
		var dynamicUrl = $(this).data('dynamic');

		if(isAnimated){
			// Stop if started
			$(this).data('animate', false).attr('src', staticUrl);
		}else{
			// Start if stopped
			$(this).data('animate', true).attr('src', dynamicUrl);
		}
	});

	$('#submit-toon').on('click', function(e){
		// Don't do get or post
		e.preventDefault();
		// Add button for the new topic
		var toon = $('#my-toon').val();
		appendBtn(toon);
		// Clear the input
		$('#my-toon').val('');
	});

});