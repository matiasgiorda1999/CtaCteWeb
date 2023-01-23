import React from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';


const CtaCtePDF = ({enterprise, initDate, finishDate, idClient, ctacteInfo, debe, haber, saldo, toAmount, 
                            toCompNumber, toDomicile, toDateSpanish, parseJwt}) => {
  return(
  <Document>
    <Page style={styles.body} size="A4">
        <View style={styles.column}>
            <Text style={styles.title}>{enterprise.nombre}</Text>
        </View>
        <View style={styles.row}>
            <View style={styles.column}>
                <Image src={enterprise.imagenURL} style={styles.avatar}/>
            </View>
            <View style={styles.column}>
                <View style={styles.column}>
                    <Text style={styles.textHeader}>{enterprise.calle} {enterprise.numeroCalle} - {toDomicile(enterprise.Localidad,enterprise.Provincia,enterprise.Pais)}</Text>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.textHeader}>{enterprise.Responsable}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textHeader}>C.U.I.T. {enterprise.CUIT}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textHeader}>Ingresos Brutos {enterprise.IngBrutoCondicion}</Text>
                    </View>
                </View>
            </View>
        </View>
        <View style={styles.column}>
            <View style={styles.row}>
                <View style={styles.box}>
                    <Text style={styles.textHeader} >Fecha de emisión: {new Date().toLocaleDateString()}</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.textHeader}>Periodo de consulta</Text>
                </View>
                <View style={styles.minbox}>
                    <Text style={styles.textHeader}>{toDateSpanish(initDate)}</Text>
                </View>
                <View style={styles.minbox}>
                    <Text style={styles.textHeader}>{toDateSpanish(finishDate)}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.minbox}>
                    <Text style={styles.textHeaderCenter}> Cuenta </Text>
                </View>
                <View style={styles.box}>
                    <View style={styles.column}>
                        <Text style={styles.textHeader}>{idClient} - {parseJwt(sessionStorage.getItem('token')).user.nombre}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.textHeader}>Domicilio: {toDomicile(null,ctacteInfo[0].Provincia,ctacteInfo[0].Pais)}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.textHeader}>Nro: 0</Text>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.textHeader}>Localidad: {ctacteInfo[0].Localidad?ctacteInfo[0].Localidad:''}</Text>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.textHeader}>C.U.I.T {parseJwt(sessionStorage.getItem('token')).user.CUIT}</Text>
                        </View>    
                        <View style={styles.column}>
                            <Text style={styles.textHeader}>{ctacteInfo[0].Responsable}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.box}>
                    <Text style={styles.textHeader}>RESUMEN DE CUENTA</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={styles.box}>
                    <View style={styles.row}>
                        <Text style={styles.textDateHeader}>Fecha</Text>
                        <Text style={styles.textDetailHeader}>Detalle</Text>
                        <Text style={styles.textCompHeader}>Comp.</Text>
                        <Text style={styles.textNumberHeader}>Debe</Text>
                        <Text style={styles.textNumberHeader}>Haber</Text>
                        <Text style={styles.textBalanceHeader}>Saldo</Text>
                        <Text style={styles.textVCHeader}>Vto.</Text>
                        <Text style={styles.textVCHeader}>Canc.</Text>
                    </View>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.col9}>
                    <Text style={styles.textHeaderRight}>Saldo Anterior: {ctacteInfo[0].SaldoIni?toAmount(ctacteInfo[0].SaldoIni):0}</Text>
                </View>
            </View>
            <View style={styles.column}>
                {
                    ctacteInfo.map((cci,i) => {
                        debe = debe + cci.Debe;
                        haber = haber + cci.Haber;
                        saldo = saldo + cci.Haber - cci.Debe;
                        return(
                            <View style={styles.column}>
                                <View style={styles.row}>
                                    <Text style={styles.textDate}>{toDateSpanish(cci.Fecha)}</Text>
                                    <Text style={styles.textDetail}>{cci.Detalle.toUpperCase()}</Text>
                                    <Text style={styles.textComp}>{toCompNumber(cci.Letra,cci.Numero)}</Text>
                                    <Text style={styles.textNumber}>{cci.Debe?toAmount(cci.Debe):0}</Text>
                                    <Text style={styles.textNumber}>{cci.Haber?toAmount(cci.Haber):0}</Text>
                                    <Text style={styles.textBalance}>{toAmount(saldo)}</Text>
                                    <Text style={styles.textVC}>-</Text>
                                    <Text style={styles.textVC}>{cci.Cancelado === 1? 'SI' : 'NO'}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </View>
            <View style={styles.column}>
                <View style={styles.rowBorderTop}>
                    <Text style={styles.textDate}></Text>
                    <Text style={styles.textDetail}></Text>
                    <Text style={styles.textComp}></Text>
                    <Text style={styles.textNumber}>{toAmount(debe)}</Text>
                    <Text style={styles.textNumber}>{toAmount(haber)}</Text>
                    <Text style={styles.textBalance}></Text>
                    <Text style={styles.textVC}></Text>
                    <Text style={styles.textVC}></Text>
                </View>
            </View>
            <View style={styles.column}>
                <View style={styles.row}>
                    <Text style={styles.textDate}></Text>
                    <Text style={styles.textDetail}></Text>
                    <Text style={styles.textBalance}>SALDO ACTUAL:</Text>
                    <Text style={styles.textNumber}></Text>
                    <Text style={styles.textNumber}></Text>
                    <Text style={styles.textBalance}>{toAmount(saldo)}</Text>
                    <Text style={styles.textVC}></Text>
                    <Text style={styles.textVC}></Text>
                </View>
            </View>
        </View>
    </Page>
  </Document>)
};

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    rowBorderTop:{
        flexDirection: 'row',
        borderStyle: 'solid',
        borderTop: '1px',
        borderColor: 'black'
    },
    row:{
        flexDirection: 'row'
    },
    column:{
        flexDirection: 'column',
        margin: '2%'
    },
    avatar:{
        width: '35px',
        height: '35px',
        borderRadius: '50%'
    },
    textHeader:{
        fontSize: 10,
        fontWeight: 'bold'
    },
    box: {
        borderStyle: 'solid', 
        borderWidth: '2px', 
        borderColor: 'black',
        padding: '1%',
        flex: 1
    },
    minbox: {
        borderStyle: 'solid', 
        borderWidth: '1.5px', 
        borderColor: 'black',
        padding: '1%',
        flex: 0.5
    },
    textHeaderCenter: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'   
    },
    textDateHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1
    },
    textDate: {
        fontSize: 8,
        flex: 1
    },
    textDetailHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 2.75
    },
    textDetail: {
        fontSize: 8,
        textAlign: 'left',
        paddingRight: '3%',
        flex: 2.75
    },
    textCompHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'left',
        flex: 1.5
    },
    textComp: {
        fontSize: 8,
        textAlign: 'left',
        paddingRight: '3%',
        flex: 1.5
    },
    textNumberHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        flex: 1   
    },
    textNumber: {
        fontSize: 8,
        textAlign: 'right',
        paddingRight: '3%',
        flex: 1   
    },
    textBalanceHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: '3%',
        flex: 1.5
    },
    textBalance: {
        fontSize: 8,
        textAlign: 'right',
        flex: 1.5
    },
    textVCHeader: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 0.5
    },
    textVC: {
        fontSize: 8,
        textAlign: 'center',
        flex: 0.5
    },
    col9:{
        width: '75%'
    },
    textHeaderRight:{
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right'
    }
});

export default CtaCtePDF;