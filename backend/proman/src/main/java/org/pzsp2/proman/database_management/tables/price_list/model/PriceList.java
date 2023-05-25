package org.pzsp2.proman.database_management.tables.price_list.model;

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
public class PriceList implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private long id;

    @Column(name = "U")
    private long voltageDataPrice;

    @Column(name = "I")
    private long currentDataPrice;

    @Column(name = "P")
    private long powerDataPrice;

    @Column(name = "E")
    private long energyDataPrice;
}
