import {Observable, Observer} from 'rxjs'

const observer: Observer<any> = {
     next: value=> console.log('next:', value),
     error: error => console.warn('error:', error),
     complete: () => console.info('completado')
};

const intervalos$ = new Observable<number>(subscriber => {
    //Crear un contador 1,2,3,4,5,....
    let num = 0;
    const interval = setInterval( 
        () => {
           num++; //cada segundo
            subscriber.next(num);
            console.log(num);
        },
        1000
    );

    setTimeout(
        () => {
                subscriber.complete();
        },
        2500
    );
    
    return () => {
        clearInterval(interval);
        console.log('Intervalo destruido');
    }

});

    // const subscription1 = intervalos$.subscribe( num => console.log('NumS1:', num));
    // const subscription2 = intervalos$.subscribe( num => console.log('NumS2:', num));
    // const subscription3 = intervalos$.subscribe( num => console.log('NumS3:', num));

    const subscription1 = intervalos$.subscribe( observer);
    const subscription2 = intervalos$.subscribe( observer);
    const subscription3 = intervalos$.subscribe( observer);

    
    //subscription1.add( subscription2 );
    //subscription2.add( subscription3 );

    setTimeout(
        () => {
            subscription1.unsubscribe();
            subscription2.unsubscribe();
            subscription3.unsubscribe();
            console.log('Completado Timeout');
        },
        6000
    );