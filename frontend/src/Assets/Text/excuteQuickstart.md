# 실행하기

프로젝트에서 Image 필터에 사용한 AI 필터는 Genarative Adeversarial Network(GAN) 모델입니다.

해당 모델은 [https://github.com/braindotai/Real-Time-Super-Resolution](https://github.com/braindotai/Real-Time-Super-Resolution)에서 다운 받을 수 있습니다. `실행하기`에서는 이 모델을 사용하여 AI 필터를 체험해보도록 하겠습니다.

링크의 github에 접속하여 우측 상단의 초록색으로 된 `Code`를 누른 후 HTTPS 주소를 복사합니다. 실습을 진행할 폴더에서 git bash 등을 이용하여 클론을 받습니다.

```
git clone <github 주소>
```

클론 받은 폴더로 이동해줍니다. 사용하는 모델마다 필요한 가상환경 조건이 다를 수 있으므로 `환경설정`에서 만들어둔 가상환경을 활성화 해줍니다. 가상환경 활성화는 anaconda, cmd 등 여러 환경에서 진행할 수 있는데 이번 실습에선 anaconda로 진행하도록 하겠습니다. anaconda prompt를 실행한 후 다음 명령어를 입력해줍니다.

```
conda activate <생성해둔 가상환경 이름> # 가상환경 활성화
cd <github 클론 받은 경로> # 클론 받은 폴더로 이동
```

이미지 필터링을 위해서는 모델이 실행되는데 필요한 라이브러리 등 패키지가 필요합니다. 필요한 패키지 내역은 requirements.txt에 기록되어 있으니 해당 폴더에서 다음 명령어를 입력해줍니다.

```
pip install -r requirements.txt
```

여기까지 마치셨다면 이제 이미지 AI 필터링을 진행할 준비는 완료되었습니다.

필터링할 낮은 화질의 이미지 폴더의 경로와 필터링된 이미지가 저장될 폴더의 경로를 지정한 후 `inference.py`를 실행해주면 됩니다.

```
python inference.py [-h] [--lr-path LR_PATH] [--sr-path SR_PATH]
# 옵션 매개 변수:
# -h, --help 도움말 메시지를 출력
# --lr-path LR_PATH 낮은 화질의 이미지 경로
# --sr-path SR_PATH 개선된 화질의 이미지가 저장될 경로
```

이번 실습에선 `braindotai/Real-Time-Super-Resolution`의 GAN 모델을 예시로 진행하였지만, 모델에 따라 이미지를 필터링하는 방법에는 차이가 있습니다. 모델에 따라 필터링 방법은 각 github의 `README.md`에 적혀있으므로 참고하시면 됩니다.