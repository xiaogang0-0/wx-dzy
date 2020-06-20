function add(n1, n2) {
    var r1 = 0,
        r2 = 0,
        m;

    n1 = "" + n1;
    n2 = "" + n2;

    if (~n1.indexOf(".")) {
        r1 = n1.split(".")[1].length;
    }
    if (~n2.indexOf(".")) {
        r2 = n2.split(".")[1].length;
    }
    if (r1 > r2) {
        n1 = n1.replace(".", "") * 1;
        n2 = n2.replace(".", "") * 1 * Math.pow(10, (r1 - r2));
    } else {
        n1 = n1.replace(".", "") * 1 * Math.pow(10, (r2 - r1));
        n2 = n2.replace(".", "") * 1;
    }
    m = Math.pow(10, Math.max(r1, r2));

    return (n2 + n1) / m;

}

function mul(n1, n2) {
    var r1 = 0,
        r2 = 0;

    n1 = "" + n1;
    n2 = "" + n2;

    if (~n1.indexOf(".")) {
        r1 = n1.split(".")[1].length;
    }
    if (~n2.indexOf(".")) {
        r2 = n2.split(".")[1].length;
    }

    n1 = n1.replace(".", "") * 1;
    n2 = n2.replace(".", "") * 1;

    return (n1 * n2) / Math.pow(10, r1 + r2);

}

function div(n1, n2) {
    var r1 = 0,
        r2 = 0,
        m;

    n1 = "" + n1;
    n2 = "" + n2;

    if (~n1.indexOf(".")) {
        r1 = n1.split(".")[1].length;
    }
    if (~n2.indexOf(".")) {
        r2 = n2.split(".")[1].length;
    }
    n1 = n1.replace(".", "") * 1;
    n2 = n2.replace(".", "") * 1;
    return (n1 / n2) * Math.pow(10, r2 - r1);

}

function sub(n1, n2) {
    return add(n1, -n2);
}

export default {
    add,
    mul,
    div,
    sub
}
