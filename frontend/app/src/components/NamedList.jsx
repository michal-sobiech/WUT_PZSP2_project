import { Container, FormLabel, List, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import BoldLabel from './BoldLabel';


export default function NamedList({name, elements}) {
    let entries = [];
    for (let i=0; i<elements.length; i++) {
        entries.push(
            <Container key={i}>
                {elements[i]}
            </Container>
        );
    }
    return (
        <Container>
            <BoldLabel>
                {name}
            </BoldLabel>
            <List style={{maxHeight: '100%', overflow: 'auto'}}>
                {entries}
            </List>
        </Container>
    );
}