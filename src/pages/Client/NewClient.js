import React, { useState, useEffect } from 'react';

import { useFormik } from 'formik';

import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import api from '../../services/api';

import './new-client.css';

export default function NewClient() {
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
        if (!values.client_name) {
            errors.client_name = 'Obrigatório';
        } else if (values.client_name.length > 50) {
            errors.client_name = 'Máximo de 50 caracters';
        }

        if (!values.client_CPF) {
            errors.client_CPF = 'Obrigatório';
        } else if (values.client_CPF.length !== 11) {
            errors.client_CPF = 'Deve conter 11 caracters';
        }

        if (!values.client_street) {
            errors.client_street = 'Obrigatório';
        } else if (values.client_street.length > 50) {
            errors.client_street = 'Máximo de 50 caracters';
        }

        if (!values.client_phone) {
            errors.client_phone = 'Obrigatório';
        } else if (values.client_phone.length !== 11) {
            errors.client_phone = 'Deve conter 11 caracters';
        }

        if (values.client_number.length > 20) {
            errors.client_number = 'Deve conter 20 caracters';
        }

        if (!values.client_district) {
            errors.client_district = 'Obrigatório';
        } else if (values.client_district.length > 50) {
            errors.client_district = 'Máximo de 50 caracters';
        }

        if (values.client_reference.length > 50) {
            errors.client_reference = 'Máximo de 50 caracters';
        }

        return errors;
    };

    const cleanFields = () => {
        formik.values.client_name = '';
        formik.values.client_CPF = '';
        formik.values.client_street = '';
        formik.values.client_phone = '';
        formik.values.client_email = '';
        formik.values.client_number = '';
        formik.values.client_district = '';
        formik.values.client_reference = '';
        formik.errors.client_CPF = '';
    };

    const formik = useFormik({
        initialValues: {
            client_name: '',
            client_CPF: '',
            client_street: '',
            client_phone: '',
            client_email: '',
            client_number: '',
            client_district: '',
            client_reference: '',
        },
        validate,
        onSubmit: async (values) => {
            // console.log(values);

            try {
                const response = await api.post(
                    '/client',
                    {
                        client_name: values.client_name,
                        client_cpf_or_cnpj: values.client_CPF,
                        client_street: values.client_street,
                        client_phone: values.client_phone,
                        client_email: values.client_email,
                        client_number: values.client_number,
                        client_district: values.client_district,
                        client_reference: values.client_reference,
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
                    formik.errors.client_CPF = 'Este CPF já está cadastrado';
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
                        <div className="column-new-client">
                            <div className="">
                                <h4 className="">Clientes</h4>
                            </div>
                            <div className="">
                                <button
                                    onClick={() => collapseRegisters()}
                                    type="submit"
                                    className="button-new-client"
                                >
                                    Novo cliente
                                </button>
                            </div>
                        </div>

                        {isVisibleItemClient === true ? (
                            <>
                                <div className="position-form-client">
                                    <div className="top-new-client">
                                        <span className="">
                                            Cadastre um Novo Cliente
                                        </span>
                                    </div>
                                    <div className="">
                                        <form
                                            id="form-new-client"
                                            onSubmit={formik.handleSubmit}
                                        >
                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Nome *
                                                    </span>
                                                    <input
                                                        id="client_name"
                                                        name="client_name"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_name
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {/* {error ===
                                                            'Insira um nome' &&
                                                            error} */}
                                                        {formik.errors
                                                            .client_name
                                                            ? formik.errors
                                                                  .client_name
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        CPF/CNPJ *
                                                    </span>
                                                    <input
                                                        id="client_CPF"
                                                        name="client_CPF"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_CPF
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_CPF
                                                            ? formik.errors
                                                                  .client_CPF
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Rua *
                                                    </span>
                                                    <input
                                                        id="client_street"
                                                        name="client_street"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_street
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_street
                                                            ? formik.errors
                                                                  .client_street
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Numero
                                                    </span>
                                                    <input
                                                        id="client_number"
                                                        name="client_number"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_number
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_number
                                                            ? formik.errors
                                                                  .client_number
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Bairro
                                                    </span>
                                                    <input
                                                        id="client_district"
                                                        name="client_district"
                                                        type="e-mail"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_district
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_district
                                                            ? formik.errors
                                                                  .client_district
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Telefone *
                                                    </span>
                                                    <input
                                                        id="client_phone"
                                                        name="client_phone"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_phone
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_phone
                                                            ? formik.errors
                                                                  .client_phone
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="input-group-base">
                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        E-mail
                                                    </span>
                                                    <input
                                                        id="client_email"
                                                        name="client_email"
                                                        type="e-mail"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_email
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_email
                                                            ? formik.errors
                                                                  .client_email
                                                            : ''}
                                                    </label>
                                                </div>

                                                <div className="input-group1">
                                                    <span className="label-client-name">
                                                        Ponto de referência
                                                    </span>
                                                    <input
                                                        id="client_reference"
                                                        name="client_reference"
                                                        type="text"
                                                        className="input-new-client"
                                                        placeholder=""
                                                        onBlur={
                                                            formik.handleBlur
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        value={
                                                            formik.values
                                                                .client_reference
                                                        }
                                                    />
                                                    <label
                                                        id="name-new-client"
                                                        className="name-new-client-warning"
                                                    >
                                                        {formik.errors
                                                            .client_reference
                                                            ? formik.errors
                                                                  .client_reference
                                                            : ''}
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                className="position-bnt-save"
                                            >
                                                <input
                                                    type="submit"
                                                    className="button-new-client"
                                                    value="Cancelar"
                                                    onClick={collapseRegisters}
                                                />
                                                <input
                                                    type="submit"
                                                    className="button-new-client"
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
                                            <span className="search-client-name">
                                                Pesquisar cliente
                                            </span>
                                            <input
                                                type="text"
                                                className="input-new-client"
                                                placeholder="Digite o nome do cliente"
                                                // value={clientName}
                                                onChange={() => {}}
                                            />
                                            <label
                                                id="name-new-client"
                                                className="name-new-client-warning"
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
