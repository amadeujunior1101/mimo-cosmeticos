import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { Chart } from 'react-google-charts';
import { Bar } from 'react-chartjs-2';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';

import './home.css';

export default function Home() {
    const [windowWidth, setWindowWidth] = useState(0);

    const data = {
        labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],

        datasets: [
            {
                type: 'line',
                label: 'Resumo semanal',
                // backgroundColor: 'red',
                borderColor: 'blue',
                borderWidth: 1,
                hoverBackgroundColor: 'blue',
                // hoverBorderColor: 'brown',
                data: [45, 198,45, 199.02, 291.99, 0, 89.62,75],
                // ticks: {
                //     beginAtZero: true,
                //     precision: 2,
                // },
            },
        ],
    };

    // const legend = {
    //     display: true,
    //     position: 'bottom',
    //     labels: {
    //         fontColor: '#323130',
    //         fontSize: 14,
    //     },
    // };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: false,
        },
        // title: {
        //     display: true,
        //     text: 'Resumo semanal',
        // },
        // labels: {
        //     fontColor: '#323130',
        //     fontSize: 14,

        // },
        // scales: {
        //     yAxes: [
        //         {
        //             ticks: {
        //                 suggestedMin: 0,
        //                 suggestedMax: 1000,
        //             },
        //         },
        //     ],
        // },

        // type: 'doughnut',
    };

    const closeAbas = () => {
        const disp = document.getElementById('sidebar-extra-report');
        disp.style.display = 'none';

        const disp1 = document.getElementById('sidebar-extra-register');
        disp1.style.display = 'none';
    };

    const sizeScreem = () => {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        setWindowWidth(windowWidth-200);
        // console.log(windowWidth + '|' + windowHeight);
    };



      window.addEventListener('resize', function(){
        sizeScreem();
      });

    useEffect(() => {
        sizeScreem();
    }, []);

    return (
        <div id="page-wrap">
            <Navbar />
            <div className="page-container">
                <Sidebar />
                <div
                    className="content"
                    id="content"
                    onClick={() => closeAbas()}
                >
                    <div className="box">
                        <div className="column-new-dashboard">
                            <div className="">
                                <h4 className="">Home</h4>
                            </div>
                            <div className="">
                                <h4 className="">Historico</h4>
                            </div>
                        </div>
                        <div className="base-graphic-bar">
                            <div className="title-graphic-bar">
                                <span>Vendas do período</span>
                            </div>

                            <div
                            // id="window-size"
                                style={{ width: windowWidth }}
                                className="position-graphic"
                            >
                                <Bar
                                    data={data}
                                    // legend={legend}
                                    height={220}
                                    options={options}
                                />
                            </div>
                        </div>

                        {/* <Chart
                            width={'800px'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Year', 'Sales'],
                                ['Dom', 0],
                                ['Seg.', 600],
                                ['Ter.', 400],
                                ['Qua', 130],
                                ['Qui', 1000],
                                ['Sex.', 200],
                                ['Sab', 800],
                            ]}
                            options={{
                                // Material design options
                                chart: {
                                    title: 'Controle semanal de vendas',
                                    // subtitle:
                                    //     'Sales, Expenses, and Profit: 2014-2017',
                                },
                                chartArea: { width: '100%' },
                            }}
                        /> */}

                        <div className="base-card-dashboard">
                            <div className="card-dashboard card-left">
                                <div className="title-card-dashboard">
                                    <span className="label-card">
                                        Valor de vendas
                                    </span>
                                    <span className="value-card">
                                        R$ 1.000,00
                                    </span>
                                    <span
                                        className="value-bottom-card"
                                        style={{}}
                                    >
                                        Ticket médio: R$ 100,00
                                    </span>
                                </div>
                            </div>

                            <div className="card-dashboard cards-central" >
                                <div className="title-card-dashboard">
                                    <span className="label-card">
                                        Lucro Total
                                    </span>
                                    <span className="value-card">
                                        R$ 560,00
                                    </span>
                                    <span
                                        className="value-bottom-card"
                                        style={{}}
                                    >
                                        Porcentagem de lucro: 27,5%
                                    </span>
                                </div>
                            </div>

                            <div className="card-dashboard cards-central">
                                <div className="title-card-dashboard">
                                    <span className="label-card">
                                        Quantidade de vendas
                                    </span>
                                    <span className="value-card">11</span>
                                    <span
                                        className="value-bottom-card"
                                        style={{ visibility: 'hidden' }}
                                    >
                                        Name
                                    </span>
                                </div>
                            </div>

                            <div className="card-dashboard card-right">
                                <div className="title-card-dashboard">
                                    {/* <span className="">
                                        {item.category_name.length > 7
                                            ? item.category_name.substring(0, 7)
                                            : item.category_name}
                                    </span> */}
                                    <span className="label-card">
                                        Itens vendidos
                                    </span>
                                    <span className="value-card">90</span>
                                    <span
                                        className="value-bottom-card"
                                        style={{ visibility: 'hidden' }}
                                    >
                                        Name
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
