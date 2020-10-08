import React, { useState, useEffect } from 'react';

import { useFormik } from 'formik';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import api from '../../services/api';

import './seller.css';

export default function Seller() {
    const [isVisibleItemClient, setIsVisibleItemClient] = useState(false);
    const [loadingTable, setLoadingTable] = useState(true);

    const [data, setData] = useState([]);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);

    const collapseRegisters = () => {
        setIsVisibleItemClient(!isVisibleItemClient);
        cleanFields();
    };

    const loadClients = async () => {
        const response = await api.get('/clients');
        setData(response.data);
        setLoadingTable(false);
        // console.log(response.data);
    };

    const validate = (values) => {
        const errors = {};
        if (!values.seller_name) {
            errors.seller_name = 'Obrigatório';
        } else if (values.seller_name.length > 50) {
            errors.seller_name = 'Máximo de 50 caracters';
        }

        if (!values.seller_CPF) {
            errors.seller_CPF = 'Obrigatório';
        } else if (values.seller_CPF.length !== 11) {
            errors.seller_CPF = 'Deve conter 11 caracters';
        }

        if (!values.seller_street) {
            errors.seller_street = 'Obrigatório';
        } else if (values.seller_street.length > 50) {
            errors.seller_street = 'Máximo de 50 caracters';
        }

        if (!values.seller_phone) {
            errors.seller_phone = 'Obrigatório';
        } else if (values.seller_phone.length !== 11) {
            errors.seller_phone = 'Deve conter 11 caracters';
        }

        if (values.seller_number.length > 20) {
            errors.seller_number = 'Deve conter 20 caracters';
        }

        if (!values.seller_district) {
            errors.seller_district = 'Obrigatório';
        } else if (values.seller_district.length > 50) {
            errors.seller_district = 'Máximo de 50 caracters';
        }

        if (values.seller_reference.length > 50) {
            errors.seller_reference = 'Máximo de 50 caracters';
        }

        return errors;
    };

    const cleanFields = () => {
        formik.values.seller_name = '';
        formik.values.seller_CPF = '';
        formik.values.seller_street = '';
        formik.values.seller_phone = '';
        formik.values.seller_email = '';
        formik.values.seller_number = '';
        formik.values.seller_district = '';
        formik.values.seller_reference = '';
        formik.errors.seller_CPF = '';
    };

    const formik = useFormik({
        initialValues: {
            seller_name: '',
            seller_CPF: '',
            seller_street: '',
            seller_phone: '',
            seller_email: '',
            seller_number: '',
            seller_district: '',
            seller_reference: '',
        },
        validate,
        onSubmit: async (values) => {
            // console.log(values);

            try {
                const response = await api.post(
                    '/seller',
                    {
                        seller_name: values.seller_name,
                        seller_cpf_or_cnpj: values.seller_CPF,
                        seller_street: values.seller_street,
                        seller_phone: values.seller_phone,
                        seller_email: values.seller_email,
                        seller_number: values.seller_number,
                        seller_district: values.seller_district,
                        seller_reference: values.client_reference,
                    }
                    //   ,
                    //   {
                    //     headers: { Authorization: `Bearer ${token}` },
                    //   },
                );

                if (response.data.error === false) {
                    const d = response.data.data;

                    const newData = [...data, ...d];

                    setData(newData);
                    setIsVisibleItemClient(!isVisibleItemClient);
                    // console.log(response.data.data);
                    cleanFields();

                    // alert('Atenção', 'Cadastro realizado com sucesso!');
                } else {
                    formik.errors.seller_CPF = 'Este CPF já está cadastrado';
                    // alert('Atenção', 'Este cliente já está cadastrado!');
                }
            } catch (error) {
                console.log('Erro no cadastro do cliente' + error);
            }
        },
    });

    const converteCPForCNPJ = (value) => {
        let cpf_cnpj = value;

        if (cpf_cnpj.length === 11) {
            let a = cpf_cnpj.substr(0, 3);
            let b = cpf_cnpj.substr(3, 3);
            let c = cpf_cnpj.substr(6, 3);
            let d = cpf_cnpj.substr(9, 2);

            let result = a + '.' + b + '.' + c + '-' + d;
            return result;
        } else {
            let a = cpf_cnpj.substr(0, 3);
            let b = cpf_cnpj.substr(3, 3);
            let c = cpf_cnpj.substr(6, 3);
            let d = cpf_cnpj.substr(9, 4);
            let e = cpf_cnpj.substr(13, 2);

            let result = a + '.' + b + '.' + c + '.' + d + '-' + e;
            return result;
        }
    };

    const convertePhone = (value) => {
        let phone = value;

        let a = phone.substr(0, 2);
        let b = phone.substr(3, 1);
        let c = phone.substr(3, 4);
        let d = phone.substr(7, 4);

        let result = '(' + a + ') ' + b + ' ' + c + '-' + d;
        return result;
    };

    useEffect(() => {
        loadClients();
    }, []);

    return (
        <div id="page-wrap">
            <Navbar />
            <div className="page-container">
                <Sidebar />
                <div className="content" id="content">
                    <div className="box">
                        <div className="column-new-seller">
                            <div className="">
                                <h4 className="">Vendedores</h4>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => collapseRegisters()}
                                    type="submit"
                                    className="button-new-seller"
                                >
                                    Novo vendedor
                                </button>
                            </div>
                        </div>

                        {isVisibleItemClient === true ? (
                            <>
                                <div className="position-form-seller">
                                    <div className="top-new-seller">
                                        <span className="">
                                            Cadastre um Novo Vendedor
                                        </span>
                                    </div>
                                    <div className="">
                                        <form
                                            id="form-new-seller"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Nome *
                                                    </span>
                                                    <input
                                                        id="seller_name"
                                                        name="seller_name"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_name
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {/* {error ===
                                                            'Insira um nome' &&
                                                            error} */}
                                                        {formik.errors
                                                            .seller_name
                                                            ? formik.errors
                                                                  .seller_name
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        CPF/CNPJ *
                                                    </span>
                                                    <input
                                                        id="seller_CPF"
                                                        name="seller_CPF"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_CPF
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_CPF
                                                            ? formik.errors
                                                                  .seller_CPF
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Rua *
                                                    </span>
                                                    <input
                                                        id="seller_street"
                                                        name="seller_street"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_street
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_street
                                                            ? formik.errors
                                                                  .seller_street
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Numero
                                                    </span>
                                                    <input
                                                        id="seller_number"
                                                        name="seller_number"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_number
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_number
                                                            ? formik.errors
                                                                  .seller_number
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Bairro
                                                    </span>
                                                    <input
                                                        id="seller_district"
                                                        name="seller_district"
                                                        type="e-mail"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_district
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_district
                                                            ? formik.errors
                                                                  .seller_district
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Telefone *
                                                    </span>
                                                    <input
                                                        id="seller_phone"
                                                        name="seller_phone"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_phone
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_phone
                                                            ? formik.errors
                                                                  .seller_phone
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        E-mail
                                                    </span>
                                                    <input
                                                        id="seller_email"
                                                        name="seller_email"
                                                        type="e-mail"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_email
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_email
                                                            ? formik.errors
                                                                  .seller_email
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-seller-name">
                                                        Ponto de referência
                                                    </span>
                                                    <input
                                                        id="seller_reference"
                                                        name="seller_reference"
                                                        type="text"
                                                        className="input-new-seller"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .seller_reference
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-seller"
                                                        className="name-new-seller-warning"
                                                    >
                                                        {formik.errors
                                                            .seller_reference
                                                            ? formik.errors
                                                                  .seller_reference
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                className="position-bnt-save"
                                            >
                                                <input
                                                    type="submit"
                                                    className="button-new-seller"
                                                    value="Cancelar"
                                                    onClick={collapseRegisters}
                                                />
                                                <input
                                                    type="submit"
                                                    className="button-new-seller"
                                                    value="Criar"
                                                    // onClick={() =>
                                                    //     handleSubmit()
                                                    // }
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </>
                        ) : (
                            loadingTable === false &&
                            (data.length > 0 ? (
                                <>
                                    <div className="search-input-group-base">
                                        <div className="search-input-group">
                                            <span className="search-seller-name">
                                                Pesquisar vendedor
                                            </span>
                                            <input
                                                type="text"
                                                className="input-new-seller"
                                                placeholder="Digite o nome do vendedor"
                                                // value={sellerName}
                                                onChange={() => {}}
                                            />
                                            <label
                                                id="name-new-seller"
                                                className="name-new-seller-warning"
                                            ></label>
                                        </div>
                                    </div>

                                    <div className="base-table">
                                        <table
                                            className="smart-table"
                                            style={{ background: '#FFF' }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Nome</th>
                                                    <th>CPF/CNPJ</th>
                                                    <th>E-mail</th>
                                                    <th>Telefone</th>
                                                    <th>Rua</th>
                                                    <th>Número</th>
                                                    <th>Bairro</th>
                                                    <th>Referência</th>
                                                    <th>Limite compra</th>
                                                    <th>#</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((item) => (
                                                    <tr
                                                        className="Ttr"
                                                        key={item.id.toString()}
                                                    >
                                                        <td
                                                            data-col-title="name"
                                                            className="Tnowrap"
                                                        >
                                                            {item.client_name}
                                                        </td>
                                                        <td
                                                            data-col-title="CPF"
                                                            className="Tnowrap"
                                                        >
                                                            {converteCPForCNPJ(
                                                                item.client_cpf_or_cnpj
                                                            )}
                                                        </td>
                                                        <td data-col-title="E-mail">
                                                            {item.client_email}
                                                        </td>

                                                        <td
                                                            data-col-title="Phone"
                                                            className="Tnowrap"
                                                        >
                                                            {convertePhone(
                                                                item.client_phone
                                                            )}
                                                        </td>
                                                        <td
                                                            data-col-title="Street"
                                                            className="Tnowrap"
                                                        >
                                                            {item.client_street}
                                                        </td>
                                                        <td data-col-title="Telefone">
                                                            {item.client_number}
                                                        </td>
                                                        <td data-col-title="District">
                                                            {
                                                                item.client_district
                                                            }
                                                        </td>
                                                        <td
                                                            data-col-title="Reference"
                                                            className="Tnowrap"
                                                        >
                                                            {
                                                                item.client_reference
                                                            }
                                                        </td>
                                                        <td data-col-title="Limite compra">
                                                            {
                                                                item.client_credit_limit
                                                            }
                                                        </td>
                                                        <td data-col-title="Limite compra">
                                                            1000,00
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <span>Sem registros</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
