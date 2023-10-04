import { Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../Header.jsx';
import { fetchEvent, deleteEvent } from '../../util/http';
import { useParams } from 'react-router-dom';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {

  const params = useParams();
  const id = params.id;
  // const [id, setId] = useState();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events-details', {id}],
    queryFn: ({signal}) => fetchEvent({id, signal}),
  });

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
            <button>Delete</button>
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
