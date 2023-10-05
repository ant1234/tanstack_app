import { Link, Outlet } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { fetchEvent, deleteEvent, queryClient } from '../../util/http';
import { useParams } from 'react-router-dom';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useNavigate } from 'react-router-dom';

export default function EventDetails() {

  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  const {data, isPending, isError} = useQuery({
    queryKey: ['events-details'],
    queryFn: ({signal}) => fetchEvent({id, signal}),
    initialData: true,
  });

  const {mutate} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      });
      navigate('/events');
    }
  });

  const deleteEventHandler = () => {
    mutate({id: id});
  };
  
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          {data.title}
        </Link>
      </Header>
      {isPending && <p>Loading ...</p>}
      {isError && <ErrorBlock title="error on details" message="try again later"/>}
      {data && 
        <article id="event-details">
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={deleteEventHandler}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.date} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </article>
      }

    </>
  );
}
