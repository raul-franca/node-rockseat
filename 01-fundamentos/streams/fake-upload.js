import { Readable } from 'node:stream';


class UmAteSemStr extends Readable {

    numero = 0;

    _read() {
        const i = this.numero++;
        if (i > 100) {
            this.push(null);
        } else {
            const buf = Buffer.from(i.toString());
            setTimeout(() => {
                this.push(buf);
            },100);
        }
    }
}

fetch('http://localhost:3001', {
method: 'POST',
    duplex: 'half',
    body: new UmAteSemStr(),
}).then(response => {
    return response.text();
}).then( data => {
    console.log(data);
});
