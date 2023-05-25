package org.pzsp2.proman.database_management.tables.inverter_a_data.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Entity(name = "pomiar_inwertera_typu_a")
@Table(name = "pomiary_inwertera_typu_a")
@AllArgsConstructor
@Getter
@Setter
public class InverterAData implements Serializable{
    @Id
    @Column(name="Id_pomiaru")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long inverterADataId;

    @Column(name="Id_inwertera")
    private long inverterId;

    @Column(name="Data_pomiaru")
    private ZonedDateTime measureDate;

    @Column(name="Stan_Pracy")
    private int workingStatus;

    @Column(name="UA_skuteczne")
    private int effectiveUA;

    @Column(name="UB_skuteczne")
    private int effectiveUB;

    @Column(name="UC_skuteczne")
    private int effectiveUC;

    @Column(name="IA_skuteczne")
    private int effectiveIA;

    @Column(name="IB_skuteczne")
    private int effectiveIB;

    @Column(name="IC_skuteczne")
    private int effectiveIC;

    @Column(name="UA_chwilowe")
    private int instantaneousUA;

    @Column(name="UB_chwilowe")
    private int instantaneousUB;

    @Column(name="UC_chwilowe")
    private int instantaneousUC;

    @Column(name="IA_chwilowe")
    private int instantaneousIA;

    @Column(name="IB_chwilowe")
    private int instantaneousIB;

    @Column(name="IC_chwilowe")
    private int instantaneousIC;

    @Column(name="Udc1")
    private int Udc1;

    @Column(name="Udc2")
    private int Udc2;

    @Column(name="Idc")
    private int Idc;

    @Column(name="PA")
    private int PA;

    @Column(name="PB")
    private int PB;

    @Column(name="PC")
    private int PC;

    @Column(name="P")
    private int P;

    @Column(name="EA_starsze")
    private int olderEA;

    @Column(name="EA_mlodsze")
    private int newerEA;

    @Column(name="EB_starsze")
    private int olderEB;

    @Column(name="EB_mlodsze")
    private int newerEB;

    @Column(name="EC_starsze")
    private int olderEC;

    @Column(name="EC_mlodsze")
    private int newerEC;

    @Column(name="Ecal_starsze")
    private int olderE;

    @Column(name="Ecal_mlodsze")
    private int newerE;

    @Column(name="QA")
    private int QA;

    @Column(name="QB")
    private int QB;

    @Column(name="QC")
    private int QC;

    @Column(name="Q")
    private int Q;

    @Column(name="EQ_starsze")
    private int olderEQ;

    @Column(name="EQ_mlodsze")
    private int newerEQ;

    @Column(name="Cos_A")
    private int cosA;

    @Column(name="Cos_B")
    private int cosB;

    @Column(name="Cos_C")
    private int cosC;

    @Column(name="T1")
    private int T1;

    @Column(name="T2")
    private int T2;

    @Column(name="obrgen")
    private int generatorRotation;

    @Column(name="F")
    private int F;

    public InverterAData() { }

}
