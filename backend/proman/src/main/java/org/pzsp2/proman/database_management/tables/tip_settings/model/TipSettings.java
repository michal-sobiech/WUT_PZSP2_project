package org.pzsp2.proman.database_management.tables.tip_settings.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;


@Entity(name = "")
@Table(name = "")
@AllArgsConstructor
@Getter
@Setter
public class TipSettings implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private long id;

    @Column(name = "id_uzytkownika")
    private long userId;

    @Column(name = "wysokie_zuzycie_energii")
    private String highEnergyLevel;

    @Column(name = "start_nocy")
    private int nightStart;

    @Column(name = "koniec_nocy")
    private int nightEnd;
}
