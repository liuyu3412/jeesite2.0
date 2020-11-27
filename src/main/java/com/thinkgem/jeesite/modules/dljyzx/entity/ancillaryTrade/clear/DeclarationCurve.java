package com.thinkgem.jeesite.modules.dljyzx.entity.ancillaryTrade.clear;


import com.thinkgem.jeesite.common.persistence.DataEntity;

/*申报曲线*/
public class DeclarationCurve  extends DataEntity<DeclarationCurve> {
    private  String startTime;//开始时间
    private  String endTime;//结束时间
    private String  tradeSeqId;

    public String getTradeSeqId() {
        return tradeSeqId;
    }

    public void setTradeSeqId(String tradeSeqId) {
        this.tradeSeqId = tradeSeqId;
    }

    private  String ePower;//电力

    public String getePower() {
        return ePower;
    }

    public void setePower(String ePower) {
        this.ePower = ePower;
    }

    private String  time;//时间段

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    private String bidDate;//时间
    private String consumerNumber;//户号
    private String timePoint1	;//	0:00	0:15
    private String timePoint2	;//	0:15	0:30
    private String timePoint3	;//	0:30	0:45
    private String timePoint4	;//	0:45	1:00
    private String timePoint5	;//	1:00	1:15
    private String timePoint6	;//	1:15	1:30
    private String timePoint7	;//	1:30	1:45
    private String timePoint8	;//	1:45	2:00
    private String timePoint9	;//	2:00	2:15
    private String timePoint10	;//	2:15	2:30
    private String timePoint11	;//	2:30	2:45
    private String timePoint12	;//	2:45	3:00
    private String timePoint13	;//	3:00	3:15
    private String timePoint14	;//	3:15	3:30
    private String timePoint15	;//	3:30	3:45
    private String timePoint16	;//	3:45	4:00
    private String timePoint17	;//	4:00	4:15
    private String timePoint18	;//	4:15	4:30
    private String timePoint19	;//	4:30	4:45
    private String timePoint20	;//	4:45	5:00
    private String timePoint21	;//	5:00	5:15
    private String timePoint22	;//	5:15	5:30
    private String timePoint23	;//	5:30	5:45
    private String timePoint24	;//	5:45	6:00
    private String timePoint25	;//	6:00	6:15
    private String timePoint26	;//	6:15	6:30
    private String timePoint27	;//	6:30	6:45
    private String timePoint28	;//	6:45	7:00
    private String timePoint29	;//	7:00	7:15
    private String timePoint30	;//	7:15	7:30
    private String timePoint31	;//	7:30	7:45
    private String timePoint32	;//	7:45	8:00
    private String timePoint33	;//	8:00	8:15
    private String timePoint34	;//	8:15	8:30
    private String timePoint35	;//	8:30	8:45
    private String timePoint36	;//	8:45	9:00
    private String timePoint37	;//	9:00	9:15
    private String timePoint38	;//	9:15	9:30
    private String timePoint39	;//	9:30	9:45
    private String timePoint40	;//	9:45	10:00
    private String timePoint41	;//	10:00	10:15
    private String timePoint42	;//	10:15	10:30
    private String timePoint43	;//	10:30	10:45
    private String timePoint44	;//	10:45	11:00
    private String timePoint45	;//	11:00	11:15
    private String timePoint46	;//	11:15	11:30
    private String timePoint47	;//	11:30	11:45
    private String timePoint48	;//	11:45	12:00
    private String timePoint49	;//	12:00	12:15
    private String timePoint50	;//	12:15	12:30
    private String timePoint51	;//	12:30	12:45
    private String timePoint52	;//	12:45	13:00
    private String timePoint53	;//	13:00	13:15
    private String timePoint54	;//	13:15	13:30
    private String timePoint55	;//	13:30	13:45
    private String timePoint56	;//	13:45	14:00
    private String timePoint57	;//	14:00	14:15
    private String timePoint58	;//	14:15	14:30
    private String timePoint59	;//	14:30	14:45
    private String timePoint60	;//	14:45	15:00
    private String timePoint61	;//	15:00	15:15
    private String timePoint62	;//	15:15	15:30
    private String timePoint63	;//	15:30	15:45
    private String timePoint64	;//	15:45	16:00
    private String timePoint65	;//	16:00	16:15
    private String timePoint66	;//	16:15	16:30
    private String timePoint67	;//	16:30	16:45
    private String timePoint68	;//	16:45	17:00
    private String timePoint69	;//	17:00	17:15
    private String timePoint70	;//	17:15	17:30
    private String timePoint71	;//	17:30	17:45
    private String timePoint72	;//	17:45	18:00
    private String timePoint73	;//	18:00	18:15
    private String timePoint74	;//	18:15	18:30
    private String timePoint75	;//	18:30	18:45
    private String timePoint76	;//	18:45	19:00
    private String timePoint77	;//	19:00	19:15
    private String timePoint78	;//	19:15	19:30
    private String timePoint79	;//	19:30	19:45
    private String timePoint80	;//	19:45	20:00
    private String timePoint81	;//	20:00	20:15
    private String timePoint82	;//	20:15	20:30
    private String timePoint83	;//	20:30	20:45
    private String timePoint84	;//	20:45	21:00
    private String timePoint85	;//	21:00	21:15
    private String timePoint86	;//	21:15	21:30
    private String timePoint87	;//	21:30	21:45
    private String timePoint88	;//	21:45	22:00
    private String timePoint89	;//	22:00	22:15
    private String timePoint90	;//	22:15	22:30
    private String timePoint91	;//	22:30	22:45
    private String timePoint92	;//	22:45	23:00
    private String timePoint93	;//	23:00	23:15
    private String timePoint94	;//	23:15	23:30
    private String timePoint95	;//	23:30	23:45
    private String timePoint96	;//	23:45	24:00:00


    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getBidDate() {
        return bidDate;
    }

    public void setBidDate(String bidDate) {
        this.bidDate = bidDate;
    }

    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public DeclarationCurve() {
    }

    public String getTimePoint1() {
        return timePoint1;
    }

    public void setTimePoint1(String timePoint1) {
        this.timePoint1 = timePoint1;
    }

    public String getTimePoint2() {
        return timePoint2;
    }

    public void setTimePoint2(String timePoint2) {
        this.timePoint2 = timePoint2;
    }

    public String getTimePoint3() {
        return timePoint3;
    }

    public void setTimePoint3(String timePoint3) {
        this.timePoint3 = timePoint3;
    }

    public String getTimePoint4() {
        return timePoint4;
    }

    public void setTimePoint4(String timePoint4) {
        this.timePoint4 = timePoint4;
    }

    public String getTimePoint5() {
        return timePoint5;
    }

    public void setTimePoint5(String timePoint5) {
        this.timePoint5 = timePoint5;
    }

    public String getTimePoint6() {
        return timePoint6;
    }

    public void setTimePoint6(String timePoint6) {
        this.timePoint6 = timePoint6;
    }

    public String getTimePoint7() {
        return timePoint7;
    }

    public void setTimePoint7(String timePoint7) {
        this.timePoint7 = timePoint7;
    }

    public String getTimePoint8() {
        return timePoint8;
    }

    public void setTimePoint8(String timePoint8) {
        this.timePoint8 = timePoint8;
    }

    public String getTimePoint9() {
        return timePoint9;
    }

    public void setTimePoint9(String timePoint9) {
        this.timePoint9 = timePoint9;
    }

    public String getTimePoint10() {
        return timePoint10;
    }

    public void setTimePoint10(String timePoint10) {
        this.timePoint10 = timePoint10;
    }

    public String getTimePoint11() {
        return timePoint11;
    }

    public void setTimePoint11(String timePoint11) {
        this.timePoint11 = timePoint11;
    }

    public String getTimePoint12() {
        return timePoint12;
    }

    public void setTimePoint12(String timePoint12) {
        this.timePoint12 = timePoint12;
    }

    public String getTimePoint13() {
        return timePoint13;
    }

    public void setTimePoint13(String timePoint13) {
        this.timePoint13 = timePoint13;
    }

    public String getTimePoint14() {
        return timePoint14;
    }

    public void setTimePoint14(String timePoint14) {
        this.timePoint14 = timePoint14;
    }

    public String getTimePoint15() {
        return timePoint15;
    }

    public void setTimePoint15(String timePoint15) {
        this.timePoint15 = timePoint15;
    }

    public String getTimePoint16() {
        return timePoint16;
    }

    public void setTimePoint16(String timePoint16) {
        this.timePoint16 = timePoint16;
    }

    public String getTimePoint17() {
        return timePoint17;
    }

    public void setTimePoint17(String timePoint17) {
        this.timePoint17 = timePoint17;
    }

    public String getTimePoint18() {
        return timePoint18;
    }

    public void setTimePoint18(String timePoint18) {
        this.timePoint18 = timePoint18;
    }

    public String getTimePoint19() {
        return timePoint19;
    }

    public void setTimePoint19(String timePoint19) {
        this.timePoint19 = timePoint19;
    }

    public String getTimePoint20() {
        return timePoint20;
    }

    public void setTimePoint20(String timePoint20) {
        this.timePoint20 = timePoint20;
    }

    public String getTimePoint21() {
        return timePoint21;
    }

    public void setTimePoint21(String timePoint21) {
        this.timePoint21 = timePoint21;
    }

    public String getTimePoint22() {
        return timePoint22;
    }

    public void setTimePoint22(String timePoint22) {
        this.timePoint22 = timePoint22;
    }

    public String getTimePoint23() {
        return timePoint23;
    }

    public void setTimePoint23(String timePoint23) {
        this.timePoint23 = timePoint23;
    }

    public String getTimePoint24() {
        return timePoint24;
    }

    public void setTimePoint24(String timePoint24) {
        this.timePoint24 = timePoint24;
    }

    public String getTimePoint25() {
        return timePoint25;
    }

    public void setTimePoint25(String timePoint25) {
        this.timePoint25 = timePoint25;
    }

    public String getTimePoint26() {
        return timePoint26;
    }

    public void setTimePoint26(String timePoint26) {
        this.timePoint26 = timePoint26;
    }

    public String getTimePoint27() {
        return timePoint27;
    }

    public void setTimePoint27(String timePoint27) {
        this.timePoint27 = timePoint27;
    }

    public String getTimePoint28() {
        return timePoint28;
    }

    public void setTimePoint28(String timePoint28) {
        this.timePoint28 = timePoint28;
    }

    public String getTimePoint29() {
        return timePoint29;
    }

    public void setTimePoint29(String timePoint29) {
        this.timePoint29 = timePoint29;
    }

    public String getTimePoint30() {
        return timePoint30;
    }

    public void setTimePoint30(String timePoint30) {
        this.timePoint30 = timePoint30;
    }

    public String getTimePoint31() {
        return timePoint31;
    }

    public void setTimePoint31(String timePoint31) {
        this.timePoint31 = timePoint31;
    }

    public String getTimePoint32() {
        return timePoint32;
    }

    public void setTimePoint32(String timePoint32) {
        this.timePoint32 = timePoint32;
    }

    public String getTimePoint33() {
        return timePoint33;
    }

    public void setTimePoint33(String timePoint33) {
        this.timePoint33 = timePoint33;
    }

    public String getTimePoint34() {
        return timePoint34;
    }

    public void setTimePoint34(String timePoint34) {
        this.timePoint34 = timePoint34;
    }

    public String getTimePoint35() {
        return timePoint35;
    }

    public void setTimePoint35(String timePoint35) {
        this.timePoint35 = timePoint35;
    }

    public String getTimePoint36() {
        return timePoint36;
    }

    public void setTimePoint36(String timePoint36) {
        this.timePoint36 = timePoint36;
    }

    public String getTimePoint37() {
        return timePoint37;
    }

    public void setTimePoint37(String timePoint37) {
        this.timePoint37 = timePoint37;
    }

    public String getTimePoint38() {
        return timePoint38;
    }

    public void setTimePoint38(String timePoint38) {
        this.timePoint38 = timePoint38;
    }

    public String getTimePoint39() {
        return timePoint39;
    }

    public void setTimePoint39(String timePoint39) {
        this.timePoint39 = timePoint39;
    }

    public String getTimePoint40() {
        return timePoint40;
    }

    public void setTimePoint40(String timePoint40) {
        this.timePoint40 = timePoint40;
    }

    public String getTimePoint41() {
        return timePoint41;
    }

    public void setTimePoint41(String timePoint41) {
        this.timePoint41 = timePoint41;
    }

    public String getTimePoint42() {
        return timePoint42;
    }

    public void setTimePoint42(String timePoint42) {
        this.timePoint42 = timePoint42;
    }

    public String getTimePoint43() {
        return timePoint43;
    }

    public void setTimePoint43(String timePoint43) {
        this.timePoint43 = timePoint43;
    }

    public String getTimePoint44() {
        return timePoint44;
    }

    public void setTimePoint44(String timePoint44) {
        this.timePoint44 = timePoint44;
    }

    public String getTimePoint45() {
        return timePoint45;
    }

    public void setTimePoint45(String timePoint45) {
        this.timePoint45 = timePoint45;
    }

    public String getTimePoint46() {
        return timePoint46;
    }

    public void setTimePoint46(String timePoint46) {
        this.timePoint46 = timePoint46;
    }

    public String getTimePoint47() {
        return timePoint47;
    }

    public void setTimePoint47(String timePoint47) {
        this.timePoint47 = timePoint47;
    }

    public String getTimePoint48() {
        return timePoint48;
    }

    public void setTimePoint48(String timePoint48) {
        this.timePoint48 = timePoint48;
    }

    public String getTimePoint49() {
        return timePoint49;
    }

    public void setTimePoint49(String timePoint49) {
        this.timePoint49 = timePoint49;
    }

    public String getTimePoint50() {
        return timePoint50;
    }

    public void setTimePoint50(String timePoint50) {
        this.timePoint50 = timePoint50;
    }

    public String getTimePoint51() {
        return timePoint51;
    }

    public void setTimePoint51(String timePoint51) {
        this.timePoint51 = timePoint51;
    }

    public String getTimePoint52() {
        return timePoint52;
    }

    public void setTimePoint52(String timePoint52) {
        this.timePoint52 = timePoint52;
    }

    public String getTimePoint53() {
        return timePoint53;
    }

    public void setTimePoint53(String timePoint53) {
        this.timePoint53 = timePoint53;
    }

    public String getTimePoint54() {
        return timePoint54;
    }

    public void setTimePoint54(String timePoint54) {
        this.timePoint54 = timePoint54;
    }

    public String getTimePoint55() {
        return timePoint55;
    }

    public void setTimePoint55(String timePoint55) {
        this.timePoint55 = timePoint55;
    }

    public String getTimePoint56() {
        return timePoint56;
    }

    public void setTimePoint56(String timePoint56) {
        this.timePoint56 = timePoint56;
    }

    public String getTimePoint57() {
        return timePoint57;
    }

    public void setTimePoint57(String timePoint57) {
        this.timePoint57 = timePoint57;
    }

    public String getTimePoint58() {
        return timePoint58;
    }

    public void setTimePoint58(String timePoint58) {
        this.timePoint58 = timePoint58;
    }

    public String getTimePoint59() {
        return timePoint59;
    }

    public void setTimePoint59(String timePoint59) {
        this.timePoint59 = timePoint59;
    }

    public String getTimePoint60() {
        return timePoint60;
    }

    public void setTimePoint60(String timePoint60) {
        this.timePoint60 = timePoint60;
    }

    public String getTimePoint61() {
        return timePoint61;
    }

    public void setTimePoint61(String timePoint61) {
        this.timePoint61 = timePoint61;
    }

    public String getTimePoint62() {
        return timePoint62;
    }

    public void setTimePoint62(String timePoint62) {
        this.timePoint62 = timePoint62;
    }

    public String getTimePoint63() {
        return timePoint63;
    }

    public void setTimePoint63(String timePoint63) {
        this.timePoint63 = timePoint63;
    }

    public String getTimePoint64() {
        return timePoint64;
    }

    public void setTimePoint64(String timePoint64) {
        this.timePoint64 = timePoint64;
    }

    public String getTimePoint65() {
        return timePoint65;
    }

    public void setTimePoint65(String timePoint65) {
        this.timePoint65 = timePoint65;
    }

    public String getTimePoint66() {
        return timePoint66;
    }

    public void setTimePoint66(String timePoint66) {
        this.timePoint66 = timePoint66;
    }

    public String getTimePoint67() {
        return timePoint67;
    }

    public void setTimePoint67(String timePoint67) {
        this.timePoint67 = timePoint67;
    }

    public String getTimePoint68() {
        return timePoint68;
    }

    public void setTimePoint68(String timePoint68) {
        this.timePoint68 = timePoint68;
    }

    public String getTimePoint69() {
        return timePoint69;
    }

    public void setTimePoint69(String timePoint69) {
        this.timePoint69 = timePoint69;
    }

    public String getTimePoint70() {
        return timePoint70;
    }

    public void setTimePoint70(String timePoint70) {
        this.timePoint70 = timePoint70;
    }

    public String getTimePoint71() {
        return timePoint71;
    }

    public void setTimePoint71(String timePoint71) {
        this.timePoint71 = timePoint71;
    }

    public String getTimePoint72() {
        return timePoint72;
    }

    public void setTimePoint72(String timePoint72) {
        this.timePoint72 = timePoint72;
    }

    public String getTimePoint73() {
        return timePoint73;
    }

    public void setTimePoint73(String timePoint73) {
        this.timePoint73 = timePoint73;
    }

    public String getTimePoint74() {
        return timePoint74;
    }

    public void setTimePoint74(String timePoint74) {
        this.timePoint74 = timePoint74;
    }

    public String getTimePoint75() {
        return timePoint75;
    }

    public void setTimePoint75(String timePoint75) {
        this.timePoint75 = timePoint75;
    }

    public String getTimePoint76() {
        return timePoint76;
    }

    public void setTimePoint76(String timePoint76) {
        this.timePoint76 = timePoint76;
    }

    public String getTimePoint77() {
        return timePoint77;
    }

    public void setTimePoint77(String timePoint77) {
        this.timePoint77 = timePoint77;
    }

    public String getTimePoint78() {
        return timePoint78;
    }

    public void setTimePoint78(String timePoint78) {
        this.timePoint78 = timePoint78;
    }

    public String getTimePoint79() {
        return timePoint79;
    }

    public void setTimePoint79(String timePoint79) {
        this.timePoint79 = timePoint79;
    }

    public String getTimePoint80() {
        return timePoint80;
    }

    public void setTimePoint80(String timePoint80) {
        this.timePoint80 = timePoint80;
    }

    public String getTimePoint81() {
        return timePoint81;
    }

    public void setTimePoint81(String timePoint81) {
        this.timePoint81 = timePoint81;
    }

    public String getTimePoint82() {
        return timePoint82;
    }

    public void setTimePoint82(String timePoint82) {
        this.timePoint82 = timePoint82;
    }

    public String getTimePoint83() {
        return timePoint83;
    }

    public void setTimePoint83(String timePoint83) {
        this.timePoint83 = timePoint83;
    }

    public String getTimePoint84() {
        return timePoint84;
    }

    public void setTimePoint84(String timePoint84) {
        this.timePoint84 = timePoint84;
    }

    public String getTimePoint85() {
        return timePoint85;
    }

    public void setTimePoint85(String timePoint85) {
        this.timePoint85 = timePoint85;
    }

    public String getTimePoint86() {
        return timePoint86;
    }

    public void setTimePoint86(String timePoint86) {
        this.timePoint86 = timePoint86;
    }

    public String getTimePoint87() {
        return timePoint87;
    }

    public void setTimePoint87(String timePoint87) {
        this.timePoint87 = timePoint87;
    }

    public String getTimePoint88() {
        return timePoint88;
    }

    public void setTimePoint88(String timePoint88) {
        this.timePoint88 = timePoint88;
    }

    public String getTimePoint89() {
        return timePoint89;
    }

    public void setTimePoint89(String timePoint89) {
        this.timePoint89 = timePoint89;
    }

    public String getTimePoint90() {
        return timePoint90;
    }

    public void setTimePoint90(String timePoint90) {
        this.timePoint90 = timePoint90;
    }

    public String getTimePoint91() {
        return timePoint91;
    }

    public void setTimePoint91(String timePoint91) {
        this.timePoint91 = timePoint91;
    }

    public String getTimePoint92() {
        return timePoint92;
    }

    public void setTimePoint92(String timePoint92) {
        this.timePoint92 = timePoint92;
    }

    public String getTimePoint93() {
        return timePoint93;
    }

    public void setTimePoint93(String timePoint93) {
        this.timePoint93 = timePoint93;
    }

    public String getTimePoint94() {
        return timePoint94;
    }

    public void setTimePoint94(String timePoint94) {
        this.timePoint94 = timePoint94;
    }

    public String getTimePoint95() {
        return timePoint95;
    }

    public void setTimePoint95(String timePoint95) {
        this.timePoint95 = timePoint95;
    }

    public String getTimePoint96() {
        return timePoint96;
    }

    public void setTimePoint96(String timePoint96) {
        this.timePoint96 = timePoint96;
    }
}
