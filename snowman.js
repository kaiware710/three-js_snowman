window.addEventListener("DOMContentLoaded", init);

function init() {
  const width = 460;
  const height = 250;

  // レンダラーを作製 //
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas"),
  });
  // スマホでも綺麗に見えるようにデバイスピクセル比を設定
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーン：オブジェクトや光源などの置き場 //
  const scene = new THREE.Scene();

  // カメラを作成。(画角, アスペクト比, 描画開始距離, 描画終了距離)
  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 0, +1000);

  // 雪だるまを作製
  // Geometry
  // Box:直方体のジオメトリー (幅, 高さ, 奥行き)
  const buttonGeometry = new THREE.BoxGeometry(5, 5, 5);

  // Material
  // MeshLamber:奥行きと影があり、光沢感のないマテリアル
  const hatMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const headMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const buttonMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
  // meshTool:3Dを2Dの手書き風にできるマテリアル
  const eyeMaterial = new THREE.MeshToonMaterial({ color: 0x000000 });

  // Object
  // 帽子本体
  const hat = new THREE.Mesh(
    // CylinderGeometry:円柱のジオメトリー (上面半径, 下面半径, 高さ, 円周分割数)
    new THREE.CylinderGeometry(25, 25, 40, 30),
    hatMaterial
  );
  hat.position.set(0, 50, 0); // (x,y,z)

  // 帽子下の赤ライン
  const hat_line = new THREE.Mesh(
    new THREE.CylinderGeometry(26, 25, 20, 30),
    new THREE.MeshLambertMaterial({ color: 0xe60033 })
  );
  hat_line.position.set(0, 35, 0);

  // 帽子の襟
  const hat_collar = new THREE.Mesh(
    new THREE.CylinderGeometry(40, 40, 5, 30),
    hatMaterial
  );
  hat_collar.position.set(0, 32, 0);

  // 雪だるまの頭
  const head = new THREE.Mesh(
    // SphereGeometry:球のジオメトリー (半径, 緯度分割数, 経度分割数)
    new THREE.SphereGeometry(40, 40, 20),
    headMaterial
  );
  head.position.set(0, 0, 0);

  // 雪だるまの右目
  const right_eye = new THREE.Mesh(
    new THREE.SphereGeometry(5, 25, 40),
    eyeMaterial
  );
  right_eye.position.set(15, 18, 30);

  // 雪だるまの左目
  const left_eye = new THREE.Mesh(
    new THREE.SphereGeometry(5, 10, 40),
    eyeMaterial
  );
  left_eye.position.set(-16, 18, 33);

  // 雪だるまの鼻
  const nose = new THREE.Mesh(
    new THREE.SphereGeometry(5, 30, 20),
    new THREE.MeshLambertMaterial({ color: 0xed9121 })
  );
  nose.position.set(3, 10, 35);

  // 雪だるまの胴体
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(50, 50, 50),
    headMaterial
  );
  body.position.set(0, -60, 0);

  const button_first = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button_first.position.set(0, -30, 37);

  const button_second = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button_second.position.set(0, -40, 43);

  // メッシュをグループ化
  const snowman = new THREE.Group();
  snowman.add(
    hat,
    hat_line,
    hat_collar,
    head,
    right_eye,
    left_eye,
    nose,
    body,
    button_first,
    button_second
  );
  scene.add(snowman);

  // ライトを作製 //
  // 平行光源(DirectionalLight)
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さ2倍
  // ライトの位置を変更(斜めから差し込むように)
  light.position.set(1, 1, 1);
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 立方体を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    // レンダリング
    renderer.render(scene, camera);
  }
}
