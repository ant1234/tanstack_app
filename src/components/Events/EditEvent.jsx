import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEvent, updateEvent } from '../../util/http.js';

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();
  const id = params.id;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({signal}) => fetchEvent({signal, id})
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent
  });

  
  function handleSubmit(formData) {
    mutate({id: params.id, event: formData});
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
