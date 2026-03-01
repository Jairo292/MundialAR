// Gallery functionality

// DOM Elements
const videoCards = document.querySelectorAll('.video-card');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSource = document.getElementById('modalVideoSource');
const closeModalBtn = document.getElementById('closeModalBtn');
const filterButtons = document.querySelectorAll('.filter-btn');
const videoThumbnails = document.querySelectorAll('.video-thumbnail');

// Play thumbnails on hover
videoThumbnails.forEach(thumbnail => {
	const card = thumbnail.closest('.video-card');
	
	card.addEventListener('mouseenter', () => {
		thumbnail.play().catch(err => {
			console.log('Autoplay prevented:', err);
		});
	});
	
	card.addEventListener('mouseleave', () => {
		thumbnail.pause();
		thumbnail.currentTime = 0;
	});
});

// Open video modal
videoCards.forEach(card => {
	card.addEventListener('click', () => {
		const videoSrc = card.dataset.video;
		openVideoModal(videoSrc);
	});
});

function openVideoModal(videoSrc) {
	modalVideoSource.src = videoSrc;
	modalVideo.load();
	videoModal.style.display = 'flex';
	
	// Play video automatically
	modalVideo.play().catch(err => {
		console.log('Autoplay prevented:', err);
	});
	
	// Reset filter to normal
	resetFilter();
	
	// Prevent body scroll
	document.body.style.overflow = 'hidden';
}

// Close video modal
closeModalBtn.addEventListener('click', closeVideoModal);

// Close modal when clicking outside video
videoModal.addEventListener('click', (e) => {
	if (e.target === videoModal) {
		closeVideoModal();
	}
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && videoModal.style.display === 'flex') {
		closeVideoModal();
	}
});

function closeVideoModal() {
	modalVideo.pause();
	modalVideo.currentTime = 0;
	modalVideoSource.src = '';
	videoModal.style.display = 'none';
	
	// Restore body scroll
	document.body.style.overflow = '';
}

// Filter functionality
filterButtons.forEach(btn => {
	btn.addEventListener('click', () => {
		const filter = btn.dataset.filter;
		applyFilter(filter);
		
		// Update active button
		filterButtons.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
	});
});

function applyFilter(filterName) {
	// Remove all filter classes
	modalVideo.classList.remove(
		'filter-blur',
		'filter-pixelate',
		'filter-grayscale',
		'filter-thermal',
		'filter-invert'
	);
	
	// Apply selected filter
	if (filterName !== 'normal') {
		modalVideo.classList.add(`filter-${filterName}`);
	}
}

function resetFilter() {
	applyFilter('normal');
	filterButtons.forEach(btn => {
		if (btn.dataset.filter === 'normal') {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
	});
}

// Prevent context menu on videos (optional)
document.querySelectorAll('video').forEach(video => {
	video.addEventListener('contextmenu', (e) => {
		e.preventDefault();
	});
});
