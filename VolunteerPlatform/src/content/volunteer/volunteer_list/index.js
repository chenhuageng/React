import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm,
} from 'antd'
import ATable from './aTable'
import '../../../App.css'
import appData from './../../../assert/Ajax';


const { Content } = Layout;

export default class volunteer_list extends Component{
	constructor(props){
		super(props);
		this.state={
			comm_name:'',
		}
		this.Router;
		this.mess = null;
	}
	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get', "userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name
			})
		})
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	_print(){
		window.print();
	}

	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }} className="printHidden">
					<Breadcrumb.Item>志愿者活动</Breadcrumb.Item>
					<Breadcrumb.Item>活动管理</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<Row type="flex" justify="space-between" gutter={1}>
						<Col span={19}>所在社区:{this.state.comm_name}</Col>
						<Col span={2} className="printHidden">
								<Button onClick={() => this._print()}>打印</Button>
						</Col>
					</Row>
					<Row>
						<Col span={8} style={{margin:'10px'}}> </Col>
					</Row>
					<ATable  message={this.mess} Router={this.Router}/>
				</Content>
			</Layout>
		)
	}
} 