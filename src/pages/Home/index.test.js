import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import PeopleCard from "../../components/PeopleCard";
import EventList from "../../containers/Events";
import EventCard from "../../components/EventCard";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      expect(screen.findByText("Message envoyé !")).toBeTruthy();
    });
  });
  
});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    render(<EventList />);
    expect(screen.getByTestId("events")).toBeInTheDocument();
    
  })
  it("a list a people is displayed", async () => {
    render(<PeopleCard />);
    expect(screen.getByTestId("card-image-testid")).toBeInTheDocument();
    
  })
  it("a footer is displayed", () => {
    render(<Home />);
    expect(screen.findByText("Notre derniére prestation"));
   
  })
  it("an event card, with the last event, is displayed", async () => {
    render(<EventCard />)
    expect(screen.getByTestId("card-testid")).toBeInTheDocument();
  
  })
});
