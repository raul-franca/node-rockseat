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
            },300);
        }
    }
}

fetch('http://localhost:3001', {
method: 'POST',
    body: new UmAteSemStr(),
    duplex: 'half'
});