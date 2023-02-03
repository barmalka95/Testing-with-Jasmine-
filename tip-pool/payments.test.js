describe('payment tests(with setup and tear-down)', function () {
    beforeEach(function () {
        // initialization
        billAmtInput.value = 100;
        tipAmtInput.value = 10;
    });
  
    it('should add a new payment to allPayments on submitPaymentInfo()', function () {
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment1'].tipAmt).toEqual('10');
        expect(allPayments['payment1'].tipPercent).toEqual(10);
    });

    it('should not add new payment on submitPaymentInfo() if bill amount input is empty', function () {
        billAmtInput.value = '';
        submitPaymentInfo();

        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should update the payment inside #paymentTable on appendPaymentTable()', function () {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
        appendPaymentTable(curPayment);
        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');

        expect(curTdList.length).toEqual(4);
        expect(curTdList[0].innerText).toEqual('$100');
        expect(curTdList[1].innerText).toEqual('$10');
        expect(curTdList[2].innerText).toEqual('10%');
        expect(curTdList[3].innerText).toEqual('X');
    });

    it('should create new payment on creatrCurPayment()', function () {
        let expectedPayment = {
            billAmt: '100',
            tipAmt: '10',
            tipPercent: 10,
        }
        expect(createCurPayment()).toEqual(expectedPayment);
    });

    it('should not create payment with empty input on createCurPayment()', function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let curPayment = createCurPayment();

        expect(curPayment).toEqual(undefined);
    });



    afterEach(function () {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
    });

});