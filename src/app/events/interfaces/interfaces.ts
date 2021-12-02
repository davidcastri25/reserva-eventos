//Interfaz de events en billboard
export interface Event {
    id:          string;
    title:       string;
    subtitle:    string;
    image:       string;
    place:       string;
    startDate:   string;
    endDate:     string;
    description: string;
}

//Interfaz de event en event-detail
export interface EventDetail {
    event:    EventInfo;
    sessions: Session[];
}

export interface EventInfo {
    id:       string;
    title:    string;
    subtitle: string;
    image:    string;
}

export interface Session {
    date:         string;
    availability: string;
    eventId?:     string;
    totalAmount?: number;
}