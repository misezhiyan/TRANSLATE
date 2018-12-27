// 中文标点符号
var chinesePunc = new Array();
chinesePunc[0] = '，';
chinesePunc[1] = '。';
chinesePunc[2] = '？';
chinesePunc[3] = '！';
chinesePunc[4] = '、';
chinesePunc[5] = '‘';
chinesePunc[6] = '’';
chinesePunc[7] = '“';
chinesePunc[8] = '”';
chinesePunc[9] = '《';
chinesePunc[10] = '》';
chinesePunc[11] = '（';
chinesePunc[12] = '）';
chinesePunc[13] = '【';
chinesePunc[14] = '】';
chinesePunc[15] = '{';
chinesePunc[16] = '}';
// 英文标点符号
var englishPunc = new Array();
englishPunc[0] = ',';
englishPunc[1] = '.';
englishPunc[2] = '?';
englishPunc[3] = '!';
englishPunc[4] = '/';
englishPunc[5] = '\'';
englishPunc[6] = '\'';
englishPunc[7] = '\"';
englishPunc[8] = '\"';
englishPunc[9] = '<';
englishPunc[10] = '>';
englishPunc[11] = '(';
englishPunc[12] = ')';
englishPunc[13] = '[';
englishPunc[14] = ']';
englishPunc[15] = '{';
englishPunc[16] = '}';

var punc = new Array();
punc[0] = chinesePunc;
punc[1] = englishPunc;

function isPuntuation(cha) {
	for (var i = 0; i < punc.length; i++) {
		var puncArrTmp = punc[i];
		for (var j = 0; j < puncArrTmp.length; j++) {
			var puncTmp = puncArrTmp[j];
			if (cha == puncTmp) {
				return true;
			}
		}
	}
	return false;
}
