export default function openModal(currentModalState) {
  return {
    type: 'TOGGLE_MODAL',
    payload: !currentModalState,
  };
}
