import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Upload, message, Typography, DatePicker, InputNumber, Col, Row, Descriptions } from 'antd';
import { CloseOutlined, CheckOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";
import axios from 'axios';
import moment from 'moment';

const Search = Input.Search;
const { TextArea } = Input;
const success = () => {
    message.success('Added New Product', 4);
};
const addDataFirst = () => {
    message.warning('Please add the data first', 4);
};
const fillTheInput = () => {
    message.error('Please fill the necessary inputs', 4);
};
const rowAlreadyAdded = () => {
    message.info('Row has already been added', 4);
};

const notImplemented = () => {
    message.info('Not Implemented Yet', 4);
};

const selectData = () => {
    message.info('Please select a data or Add new Data first', 4);
};
const EditableTable = () => {
    const initialProductTagState = {
        _id: '',
        po_no: "0",
        invoice_no: "0",
        supplier_note: "",
        total: 0,
        stock_source: "0",
        due_date: "November-25-1997",
        received: false,
        type: "",
        status: "Open",
        po_items: [
            {
                bill_to: "",
                ship_to: "",
                quantity: 0,
                delivery_due_date: "November-21-1997",
                item_cost: 0,
                tax: 0,
                total: 0,
            }
        ]
    };

    const [bulk, setBulk] = useState([]);
    const [vat, setVat] = useState(0);
    const [loading, setLoading] = useState(false);
    const dateFormat = 'YYYY/MM/DD';
    const [editingIndex, setEditingIndex] = useState(undefined);
    const [editable, setEditable] = useState(true);
    const [purchaseOrderData, setpurchaseOrderData] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredPurchaseOrderData, setfilteredPurchaseOrderData] = useState([]);
    const [toBeSaveData, setToBeSaveData] = useState();
    const [flag, setFlag] = useState(true);


    const [indexer, setIndexer] = useState(undefined);
    const [getTotal, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [itemCost, setItemCost] = useState(0);

    useEffect(() => {
        retrieveAllData();
    }, []);

    const retrieveAllData = () => {

        setLoading(true);
        axios.get('http://localhost:5001/purchase_orders/stock_order')

            .then(res => {

                setpurchaseOrderData(res.data);
                setfilteredPurchaseOrderData(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    };

    const getSelectedId = e => {
    }

    //FOR Select many
    const onSelectChange = selectedRowKeys => {
        getSelectedId(selectedRowKeys);
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setBulk({ selectedRowKeys });
    };
    const { selectedRowKeys } = bulk;
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        hideDefaultSelections: true,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
        ],


    };
    //END OF BULK ACTION

    const toggleEdit = (index) => {
        setEditingIndex(index)
        setEditable(false)
    }

    const onSave = (id, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) => {
        const newData = {
            po_no: a,
            invoice_no: b,
            supplier_note: c,
            total: d,
            stock_source: e,
            due_date: f,
            received: g,
            type: h,
            status: i,
            po_items:
                [{
                    bill_to: j,
                    ship_to: k,
                    quantity: l,
                    delivery_due_date: m,
                    item_cost: n,
                    tax: o,
                    total: p,
                }]

        };
        console.log(id);
        axios.post('http://localhost:5001/purchase_orders/update/' + id, newData)
            .then(res => retrieveAllData())
            .catch(err => console.log(newData));
        setEditingIndex(undefined);
    }

    const columns = [
        {
            title: 'ST No.',
            dataIndex: 'st_no',
            render: (value, row, index) => {
                if (index === editingIndex) {
                    return [
                        <Typography key={index} >{value}</Typography>
                    ];
                } else {
                    return [
                        <Typography key={index} >{value}</Typography>
                    ];
                }
            }
        },

        {
            title: 'Product Name',
            dataIndex: 'productName',
            render: (value, result, index) => {
                if (index === editingIndex) {
                    return [
                        <Typography key={index} >{result.po_items[0].productName}</Typography>
                    ];
                } else {
                    return [
                        <Typography key={index} >{result.po_items[0].productName}</Typography>
                    ];
                }
            }
        },
        {
            title: 'SKU ',
            dataIndex: 'sku',
            render: (value, result, index) => {
                if (index === editingIndex) {
                    return [
                        <Typography key={index} >{result.po_items[0].sku}</Typography>
                    ];
                } else {
                    return [
                        <Typography key={index} >{result.po_items[0].sku}</Typography>
                    ];
                }
            }
        },
        {
            title: 'Supplier Code',
            dataIndex: 'supplierCode',
            key: 'supplierCode',
            width: 150,
        },
        {
            title: 'Source Outlet',
            dataIndex: 'sourceOutlet',
            key: 'sourceOutlet',
            width: 150,
        },
        {
            title: 'Destination Outlet',
            dataIndex: 'destinationOutlet',
            key: 'destinationOutlet',
            width: 150,
        },
        {
            title: 'Delivery Due',
            dataIndex: 'delviery_due_date',
            render: (value, result, index) => {
                if (index === editingIndex) {
                    return [
                        <DatePicker
                            format={dateFormat}
                            defaultValue={moment(result.po_items[0].delivery_due_date, dateFormat)}
                            key={index} disabled={editable} onChange={event => setInput(event, index, "delviery_due_date")} />
                    ];
                } else {
                    return [
                        <Typography key={index}><DatePicker disabled defaultValue={moment(result.po_items[0].delivery_due_date, dateFormat)}></DatePicker></Typography>
                    ];
                }
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (value, result, index) => {
                if (index === editingIndex) {
                    return [
                        <InputNumber key={index} disabled={editable} value={result.po_items[0].quantity} onChange={(event) => { setInputSub(event, index, "quantity") }} />
                    ];
                } else {
                    return [
                        <Typography key={index} >{result.po_items[0].quantity}</Typography>
                    ];
                }
            }
        },
        {
            title: 'Source Stock Count',
            dataIndex: 'sourceStockCount',
            key: 'sourceStockCount',
            width: 150,

        },
        {
            title: 'Transfer Quantity',
            dataIndex: 'transferQuantity',
            key: 'transferQuantity',
            width: 150,

        },

        {
            title: 'Supplier Cost',
            dataIndex: 'supplierCost',
            key: 'supplierCost',
            width: 150,

        },
        {
            title: 'Total Cost',
            dataIndex: 'total',
            render: (value, result, index) => {
                if (index === editingIndex) {
                    return [
                        <InputNumber key={index} disabled={editable} value={result.po_items[0].total} onChange={(event) => { setInputSub(event, index, "total") }} />
                    ];
                } else {
                    return [
                        <Typography key={index} >{result.po_items[0].total}</Typography>
                    ];
                }
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (value, row, index) => {
                if (index === editingIndex) {
                    return [
                        <React.Fragment key={index}>
                            <Button icon={<SaveOutlined />} shape={"circle"} type={"primary"} style={{ marginRight: 8 }}
                                onClick={() =>
                                    onSave(row._id, row.po_no, row.invoice_no, row.supplier_note,
                                        row.total, row.stock_source, row.due_date, row.received,
                                        row.type, row.status
                                        , row.po_items[0].bill_to, row.po_items[0].ship_to, row.po_items[0].quantity,
                                        row.po_items[0].delivery_due_date,
                                        row.po_items[0].item_cost, row.po_items[0].tax, row.po_items[0].total)} />
                            <Button icon={<CloseOutlined />} shape={"circle"} onClick={() => setEditingIndex(undefined)} />
                        </React.Fragment>
                    ];
                } else {
                    return [
                        <Button key={index} icon={<EditOutlined />} shape={"circle"} style={{ marginRight: 8 }} disabled={editingIndex !== undefined}
                            onClick={() => toggleEdit(index)} />
                    ];
                }
            }
        }


    ];

    const setInputSub = (value, index, sub_col) => {
        let tempdata = [...filteredPurchaseOrderData];
        tempdata[index]['po_items'][0][sub_col] = value;
        setfilteredPurchaseOrderData(tempdata);
    };


    const setInput = (value, index, column) => {
        let tempdata = [...filteredPurchaseOrderData];
        tempdata[index][column] = value;
        setfilteredPurchaseOrderData(tempdata);
    };


    // For Search Ni siya
    useEffect(() => {
        console.log(purchaseOrderData)
        setfilteredPurchaseOrderData(
            purchaseOrderData.filter(data =>

                data.po_no.toLowerCase().includes(search.toLowerCase()) ||
                data.invoice_no.toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].bill_to.toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].ship_to.toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].delivery_due_date.toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].item_cost.toString().toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].quantity.toString().toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].tax.toString().toLowerCase().includes(search.toLowerCase()) ||
                data.po_items[0].total.toString().toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, purchaseOrderData]);
    // End of Search area

    //Add Row
    const handleAdd = () => {
        const countPo = filteredPurchaseOrderData.length + 1;
        if (flag == true) {
            const newData =
            {
                "_id": countPo,
                "key": countPo,
                "po_no": countPo,
                "invoice_no": countPo,
                "po_items": [{
                    "bill_to": "",
                    "ship_to": "",
                    "delivery_due_date": "2020-05-12",
                    "quantity": 0,
                    "item_cost": 0,
                    "tax": 0,
                    "total": 0
                }]
            };
            setfilteredPurchaseOrderData([...filteredPurchaseOrderData, newData]);
            setToBeSaveData([newData]);
            setFlag(false)

        }
        else {
            console.log("already added")
            rowAlreadyAdded();
        }

    };
    /// FOR ADD NEW PURCHASE ORDER
    const handleSubmit = event => {

        // If walay data gi select ug walay row gi add
        if (selectedRowKeys == undefined && toBeSaveData == undefined) {
            selectData();
        } // if walay data gi selct but naa row gi add
        else if (selectedRowKeys == undefined && toBeSaveData != undefined) {
            for (let c = 0; c < toBeSaveData.length; c++) {
                if (toBeSaveData[c].po_items[0]['delivery_due_date'] == "") {
                    fillTheInput();
                }
                else {
                    event.preventDefault();
                    axios.post("http://localhost:5001/purchase_orders/add", {
                        "key": toBeSaveData[c].key,
                        "po_no": toBeSaveData[c].po_no,
                        "invoice_no": toBeSaveData[c].invoice_no,
                        "status": "Open",
                        "type": "Stock Order",
                        "received": false,
                        "po_items": [{
                            "bill_to": toBeSaveData[c].po_items[0].bill_to,
                            "ship_to": toBeSaveData[c].po_items[0].ship_to,
                            "delivery_due_date": toBeSaveData[c].po_items[0].delivery_due_date,
                            "quantity": toBeSaveData[c].po_items[0].quantity,
                            "item_cost": toBeSaveData[c].po_items[0].item_cost,
                            "tax": toBeSaveData[c].po_items[0].tax,
                            "total": toBeSaveData[c].po_items[0].total
                        }]
                    })
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    setFlag(true);
                    success();
                }
            }
            window.location.reload(true);
        }//Means if naay data gi select but walay gi add na row
        else if (selectedRowKeys != undefined && toBeSaveData == undefined) {
            axios.post("http://localhost:5001/purchase_orders/open", selectedRowKeys)
                .then(res => retrieveAllData())
                .catch(err => console.log(selectedRowKeys));
            window.location.reload(true);
            // notImplemented();
        }
        else if (selectedRowKeys != undefined && toBeSaveData != undefined) {
            addDataFirst();
        }
        else {
            notImplemented();
        }



    }
    /// FOR ADD NEW PURCHASE ORDER
    const handleDraft = event => {
        // If walay data gi select ug walay row gi add
        if (selectedRowKeys == undefined && toBeSaveData == undefined) {
            selectData();
        } // if walay data gi selct but naa row gi add
        else if (selectedRowKeys == undefined && toBeSaveData != undefined) {
            for (let c = 0; c < toBeSaveData.length; c++) {
                if (
                    toBeSaveData[c].po_items[0]['delivery_due_date'] == "") {
                    fillTheInput();
                }
                else {

                    //event.preventDefault();
                    axios.post("http://localhost:5001/purchase_orders/add", {
                        "_id": c,
                        "key": toBeSaveData[c].key,
                        "po_no": toBeSaveData[c].po_no,
                        "invoice_no": toBeSaveData[c].invoice_no,
                        "type": "Stock Order",
                        "status": "Draft",
                        "received": false,
                        "po_items": [{
                            "bill_to": toBeSaveData[c].po_items[0].bill_to,
                            "ship_to": toBeSaveData[c].po_items[0].ship_to,
                            "delivery_due_date": toBeSaveData[c].po_items[0].delivery_due_date,
                            "quantity": toBeSaveData[c].po_items[0].quantity,
                            "item_cost": toBeSaveData[c].po_items[0].item_cost,
                            "tax": toBeSaveData[c].po_items[0].tax,
                            "total": toBeSaveData[c].po_items[0].total
                        }]
                    })
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        })
                    setFlag(true);
                    success();
                }
            } window.location.reload(true);
        }//Means if naay data gi select but walay gi add na row
        else if (selectedRowKeys != undefined && toBeSaveData == undefined) {
            axios.post("http://localhost:5001/purchase_orders/updated/draft", selectedRowKeys)
                .then(res => retrieveAllData())
                .catch(err => console.log(selectedRowKeys));
            window.location.reload(true);
            // notImplemented();
        }
        else if (selectedRowKeys != undefined && toBeSaveData != undefined) {
            addDataFirst();
        }
        else {
            notImplemented();
        }

    }
    const handleCancel = event => {
        // If walay data gi select ug walay row gi add
        if (selectedRowKeys == undefined) {
            selectData();
        } // if walay data gi selct but naa row gi add
        else {
            axios.post("http://localhost:5001/purchase_orders/void", selectedRowKeys)
                .then(res => retrieveAllData())
                .catch(err => console.log(selectedRowKeys));
            window.location.reload(true);
        }
    }

    return (

        <section >
            <header >
                <Row style={{ margin: '15px' }} >
                    <Col span={12}>
                        <Row span={24}>
                            <Upload >
                                <Button type="primary" style={{ marginRight: '15px', width: "200px" }}>Import Order From .CSV</Button>
                            </Upload>
                            <CSVLink style={{ maxHeight: '30px', marginRight: '15px', width: "200px", minWidth: '200px', borderWidth: '2px', border: 'solid', textAlign: 'center' }} data={filteredPurchaseOrderData}>Download .CSV Template</CSVLink>
                        </Row>

                    </Col>
                    <Col span={6}>

                    </Col>
                    <Col span={6}>

                        <Search
                            placeholder="Enter Title"
                            onChange={e => setSearch(e.target.value)}
                            style={{ width: 200 }}
                        />
                    </Col>
                    <Col span={6}>

                    </Col>
                </Row>

                <Row >
                    <Col span={24}>
                        <Table rowSelection={rowSelection}
                            rowKey={filteredPurchaseOrderData => filteredPurchaseOrderData._id} column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                            pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30'] }}
                            showQuickJumper dataSource={filteredPurchaseOrderData} columns={columns}  >
                        </Table>;

                    </Col>

                </Row>

                <Row  >
                    <Col span={24} style={{ marginBottom: "10px" }}>
                        <Button type="primary" onClick={() => { handleAdd() }} style={{ marginRight: '15px', width: "200px" }}>Add New Product</Button>
                    </Col>
                    <Col span={12}>
                        <h1>Note to supplier: </h1>
                        <TextArea rows={4} placeholder="Type Here.." style={{ width: "500px", height: "110px", minWidth: '200px' }}>

                        </TextArea>
                    </Col>
                    <Col span={12} >
                        <Col span={24} style={{ marginLeft: '240px', }}>

                            <Col span={10} >

                                <Row>
                                    <Descriptions bordered>
                                        <Descriptions.Item label="VAT(12%)" style={{ width: '200px' }}></Descriptions.Item>
                                    </Descriptions>
                                </Row>
                                <Row>
                                    <Descriptions bordered >
                                        <Descriptions.Item label="Total Cost " style={{ width: '200px' }}></Descriptions.Item>
                                    </Descriptions>
                                </Row>
                            </Col>
                            <Col span={24}>

                            </Col>

                        </Col>

                    </Col>
                    <Col span={12} >

                    </Col>
                </Row>
                <Row style={{ marginTop: '40px' }} >
                    <Col span={12}>


                    </Col>

                    <Col span={12}>
                        <Col span={24} style={{ marginTop: '50px' }}>
                            <Button type="danger" style={{ marginRight: '15px', width: "150px" }} onClick={handleCancel}>Cancel</Button>
                            <Button type="" style={{ marginRight: '15px', width: "150px" }} onClick={handleDraft}>Save Draft</Button>
                            <Button type="primary" style={{ marginRight: '15px', width: "150px" }} onClick={handleSubmit} >Send to Destination</Button>
                        </Col>
                    </Col>
                </Row>

            </header>

        </section>
    );
}

export default EditableTable