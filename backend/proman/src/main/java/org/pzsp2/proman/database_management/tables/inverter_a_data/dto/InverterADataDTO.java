package org.pzsp2.proman.database_management.tables.inverter_a_data.dto;

import org.pzsp2.proman.database_management.tables.inverter_a_data.model.InverterAData;

import java.time.ZonedDateTime;

public record InverterADataDTO(Long inverterADataId, Long inverterId, ZonedDateTime measureDate, int workingStatus, int effectiveUA,
        int effectiveUB, int effectiveUC, int effectiveIA, int effectiveIB, int effectiveIC, int instantaneousUA, int instantaneousUB,
        int instantaneousUC, int instantaneousIA, int instantaneousIB, int instantaneousIC, int Udc1, int Udc2, int Idc, int PA,
        int PB, int PC, int P, int olderEA, int newerEA, int olderEB, int newerEB, int olderEC, int newerEC, int olderE, int newerE,
        int QA, int QB, int QC, int Q, int olderEQ, int newerEQ, int cosA, int cosB, int cosC, int T1, int T2, int generatorRotation, int F) {

    public static InverterADataDTO of(final InverterAData inverterAData) {
        return new InverterADataDTO(
                inverterAData.getInverterADataId(),
                inverterAData.getInverterId(),
                inverterAData.getMeasureDate(),
                inverterAData.getWorkingStatus(),
                inverterAData.getEffectiveUA(),
                inverterAData.getEffectiveUB(),
                inverterAData.getEffectiveUC(),
                inverterAData.getEffectiveIA(),
                inverterAData.getEffectiveIB(),
                inverterAData.getEffectiveIC(),
                inverterAData.getInstantaneousUA(),
                inverterAData.getInstantaneousUB(),
                inverterAData.getInstantaneousUC(),
                inverterAData.getInstantaneousIA(),
                inverterAData.getInstantaneousIB(),
                inverterAData.getInstantaneousIC(),
                inverterAData.getUdc1(),
                inverterAData.getUdc2(),
                inverterAData.getIdc(),
                inverterAData.getPA(),
                inverterAData.getPB(),
                inverterAData.getPC(),
                inverterAData.getP(),
                inverterAData.getOlderEA(),
                inverterAData.getNewerEA(),
                inverterAData.getOlderEB(),
                inverterAData.getNewerEB(),
                inverterAData.getOlderEC(),
                inverterAData.getNewerEC(),
                inverterAData.getOlderE(),
                inverterAData.getNewerE(),
                inverterAData.getQA(),
                inverterAData.getQB(),
                inverterAData.getQC(),
                inverterAData.getQ(),
                inverterAData.getOlderEQ(),
                inverterAData.getNewerEQ(),
                inverterAData.getCosA(),
                inverterAData.getCosB(),
                inverterAData.getCosC(),
                inverterAData.getT1(),
                inverterAData.getT2(),
                inverterAData.getGeneratorRotation(),
                inverterAData.getF()
        );
    }
}
