import './App.css';
import * as React from "react";
import Loader from 'react-loader-spinner';

function App() {

    class Posts extends React.Component {
        render() {
            let loader
            if (this.props.loading) {
                loader =
                    <div className="center">
                        <Loader className="center" type="Oval" color="#00BFFF" height={80} width={80}/>
                    </div>
            }
            return (
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                    </thead>
                        {loader}
                    <tbody>
                    {this.props.posts && this.props.posts.map(post => {
                        return <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                    })}
                    </tbody>

                </table>
            );
        }
    }

    class Shell extends React.Component {
        constructor(props) {
            super(props);
            this.state = {loading: true,posts: [],id: '', title: '', body: '' };
        }
        sleep = milliseconds => {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
        };
        async loadData() {
            await this.sleep(5000);
            fetch("https://jsonplaceholder.typicode.com/posts", {
                "method": "GET"
            })
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        posts: response,
                        loading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        }

        componentDidMount() {
            this.loadData();
        }

        render() {
           return (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Get Posts API Call</h1>
                            <Posts posts={this.state.posts} loading={this.state.loading}/>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (<div className="App"> < Shell/> </div>);
}

export default App;
