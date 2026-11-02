// 사진 버튼을 누르면 해당 사진을 화면 중앙에 크게 보여줍니다.
const photoModal = document.getElementById('photoModal');
const modalImage = photoModal.querySelector('.modal-image');
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    modalImage.src = button.dataset.photo;
    photoModal.classList.add('open');
    photoModal.setAttribute('aria-hidden', 'false');
  });
});
function closePhotoModal() {
  photoModal.classList.remove('open');
  photoModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
}
photoModal.querySelector('.modal-close').addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', event => {
  if (event.target === photoModal) closePhotoModal();
});

// 계좌번호를 클립보드에 복사한 뒤 완료 팝업을 표시합니다.
const copyModal = document.getElementById('copyModal');
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const accountNumber = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch (error) {
      // 보안 연결이 아닌 환경에서도 복사를 시도할 수 있도록 대체 방법을 사용합니다.
      const temporaryInput = document.createElement('textarea');
      temporaryInput.value = accountNumber;
      document.body.appendChild(temporaryInput);
      temporaryInput.select();
      document.execCommand('copy');
      temporaryInput.remove();
    }
    copyModal.classList.add('open');
    copyModal.setAttribute('aria-hidden', 'false');
  });
});
function closeCopyModal() {
  copyModal.classList.remove('open');
  copyModal.setAttribute('aria-hidden', 'true');
}
document.getElementById('closeCopy').addEventListener('click', closeCopyModal);
copyModal.addEventListener('click', event => {
  if (event.target === copyModal) closeCopyModal();
});

// ESC 키로 열린 팝업을 닫습니다.
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closePhotoModal();
    closeCopyModal();
  }
});
