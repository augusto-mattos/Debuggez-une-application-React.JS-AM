import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredEvents = (
    (!type 
      ? data?.events // si aucun type est selectioné, tous les cards sont affichés
      : data?.events.filter(event => event.type === type) // dans le cas contraire, seulement les event.type qui correspondent au type selectionné sont affichés
    ) || [] ) 
  
  const sortFilteredEvents = filteredEvents.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const totalDisplayedEvents = sortFilteredEvents.length;
  const totalPages = Math.ceil(totalDisplayedEvents / PER_PAGE);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const displayedItems = sortFilteredEvents.slice(startIndex, endIndex);
  
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  
  const typeList = new Set(data?.events.map((event) => event.type));
  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {displayedItems.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <a 
              key={pageNumber}
              href="#events" 
              onClick={() => handlePageChange(pageNumber)}>
                {pageNumber}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
