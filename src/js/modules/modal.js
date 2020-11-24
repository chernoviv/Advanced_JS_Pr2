function openModal(modalSelector, timerModal) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('active');
	modal.classList.remove('fadedOut_modals');
    modal.classList.add('fadedIn_modals');
    
	if (timerModal) {
		clearInterval(timerModal);
	}
}

function closeModal(timerModal) {
	const modal = document.querySelector('body > div[class*=popup][class~=active]');

	if (modal) {
		modal.classList.remove('fadedIn_modals');
		modal.classList.add('fadedOut_modals');
	
		modal.addEventListener('animationend', () => {
			modal.classList.remove('active');
		}, {once: true});
	}

	if (timerModal) {
		clearInterval(timerModal);
	}
}

// function thanksModal() {

// 	const thanksModal = document.createElement('div');
// 	thanksModal.classList.add('popup_thanks');
// 	thanksModal.innerHTML = `
// 		<div class="popup_dialog">
// 			<div class="popup_content text-center">
// 				<div class="popup_thanks_message">
// 				</div>
// 				<button type="button" class="popup_close"><strong>×</strong></button>
// 			</div>
// 		</div>	
// 	`;

// 	document.body.append(thanksModal);

// 	thanksModal.addEventListener('click', e => {
// 		if (e.target === thanksModal || e.target.parentElement.classList.contains('popup_close')) {
// 			closeModal();
// 		}
// 	});

// 	document.addEventListener('keydown', e => {
// 		if (e.code === 'Escape') {
// 			closeModal();
// 		}
// 	});
// }

// thanksModal();

function modal(triggerSelector, modalSelector, windowData, timerModal) {

	const btnShowModal = document.querySelectorAll(triggerSelector),
		  modal = document.querySelector(modalSelector),
		  errorMessage = document.createElement('div'); 

	// errorMessage.className = "status";	

	// function dataValidate(currentModalSelector, message) {
	// 	const currentModal = document.querySelector(`${currentModalSelector} > div > div`);
		
	// 	currentModal.append(errorMessage);

	// 	if (windowData.valid) {
	// 		errorMessage.remove();
	// 		closeModal();
	// 		openModal(modalSelector);
	// 		windowData.valid = false;
	// 	} else {
	// 		errorMessage.textContent = message;
	// 	}
	// }

	btnShowModal.forEach(item => {
		item.addEventListener('click', e => {

			e.preventDefault();

			switch (triggerSelector) {
				case '.fixed-gift':
                    item.remove();
                    openModal(modalSelector);
				break;
				case '.popup_calc_profile_button':
					dataValidate('.popup_calc_profile', 'Пожалуйста, выберите тип остекления и его профиль');
				break;
				default:
					openModal(modalSelector, timerModal);
				break;
			}

		});
	});

	modal.addEventListener('click', e => {
		if (e.target === modal || e.target.classList.contains('popup-close')) {
			closeModal();
			if (windowData) {
				windowData.resetToDefault();
			}
		}
	});

	document.addEventListener('keydown', e => {
		if (e.code === 'Escape' && modal.classList.contains('active')) {
			closeModal();
			if (windowData) {
				windowData.resetToDefault();
			}
		}
	});
}

export default modal;
export {openModal, closeModal};