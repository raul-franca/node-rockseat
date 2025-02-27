import { Readable, Writable, Transform } from 'node:stream';


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

class Multiplicador extends Writable {
    _write(chunk, encoding, callback) {
        const n = parseInt(chunk.toString());
        const res = n * 10;
        console.log(res);
        callback();
    }
}

class InversorNum extends Transform{
    _transform(chunk, encoding, callback){

        const n = parseInt(chunk.toString());
        const res = n * -1;
        callback(null, res.toString());

    }

}


 new UmAteSemStr()
     .pipe(new InversorNum())
     .pipe(new Multiplicador());