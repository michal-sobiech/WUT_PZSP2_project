package org.pzsp2.proman.database_management.tables.log.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.ZonedDateTime;


@Entity(name = "")
@Table(name = "")
@AllArgsConstructor
@Getter
@Setter
public class Log implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "Data")
    @Temporal(TemporalType.TIMESTAMP)
    private ZonedDateTime date;

    @Column(name = "Opis")
    private String description;
}
