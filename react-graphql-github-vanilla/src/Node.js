import React, {Component} from 'react';

const Node = ({node}) =>
{
   return(
        <div>
            <h1>{node.name}</h1>
            <br/>
            <table>
                <tr>
                    <td>
                        <label>Id</label>
                    </td>                
                    <td>
                        <label> {node.id}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Description:</label>
                    </td>                
                    <td>
                        <label> {node.description}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Created On:</label>
                    </td>                
                    <td>
                        <label> {node.createdAt}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>SSH URL:</label>
                    </td>                
                    <td>
                        <label> {node.sshUrl}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Node URL:</label>
                    </td>                
                    <td>
                        <label> {node.url}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Node Owner Id:</label>
                    </td>                
                    <td>
                        <label> {node.owner.id}</label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label>Node Owner Avatar:</label>
                    </td>                
                    <td>
                        <label> {node.owner.avatarUrl}</label>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default Node;
